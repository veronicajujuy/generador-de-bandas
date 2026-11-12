import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Check, Copy, Disc3, RefreshCw, Shuffle } from 'lucide-react';
import { BandArchive } from './components/BandArchive';
import { GenreExplorer } from './components/GenreExplorer';
import { VinylSleeve } from './components/VinylSleeve';
import { WordMixerPanel } from './components/WordMixerPanel';
import { FORMULA_OPTIONS, VIBE_OPTIONS } from './data/lexicon';
import { FormulaId, GeneratedBand, InventedGenre, VibeFilter } from './types/band';
import {
  buildBandPressText,
  generateBand,
  generateInventedGenre,
  rerollSingleSlot,
  updateSlotCustomValue,
} from './utils/generator';

const STORAGE_KEY = 'prensa_sonora_saved_bands_v1';

export default function App() {
  const [vibe, setVibe] = useState<VibeFilter>('todos');
  const [formulaSelection, setFormulaSelection] = useState<FormulaId | 'aleatorio'>('aleatorio');

  const [currentBand, setCurrentBand] = useState<GeneratedBand>(() =>
    generateBand({ vibe: 'todos', formulaId: 'aleatorio' })
  );

  const [history, setHistory] = useState<GeneratedBand[]>(() => [currentBand]);
  const [savedBands, setSavedBands] = useState<GeneratedBand[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBands));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [savedBands]);

  const pushToHistory = useCallback((band: GeneratedBand) => {
    setHistory((prev) => [band, ...prev.filter((item) => item.id !== band.id)].slice(0, 8));
  }, []);

  const handleGenerateBand = useCallback(() => {
    const hasLockedSlots = currentBand.slots.some(
      (s) => s.locked && s.kind !== 'connector'
    );

    const next = generateBand({
      vibe,
      formulaId: formulaSelection,
      forceFormulaId: hasLockedSlots ? currentBand.formulaId : undefined,
      existingSlots: hasLockedSlots ? currentBand.slots : undefined,
    });

    setCurrentBand(next);
    pushToHistory(next);
  }, [currentBand.formulaId, currentBand.slots, formulaSelection, pushToHistory, vibe]);

  const handleFormulaChange = (nextFormula: FormulaId | 'aleatorio') => {
    setFormulaSelection(nextFormula);
    const next = generateBand({
      vibe,
      formulaId: nextFormula,
    });
    setCurrentBand(next);
    pushToHistory(next);
  };

  const handleVibeChange = (nextVibe: VibeFilter) => {
    setVibe(nextVibe);
    const next = generateBand({
      vibe: nextVibe,
      formulaId: formulaSelection,
    });
    setCurrentBand(next);
    pushToHistory(next);
  };

  const handleRerollGenreOnly = () => {
    const nextGenre = generateInventedGenre(vibe);
    setCurrentBand((prev) => ({
      ...prev,
      genre: nextGenre,
    }));
  };

  const handleSelectGenre = (genre: InventedGenre) => {
    setCurrentBand((prev) => ({
      ...prev,
      genre,
    }));
    document.getElementById('generador')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleLock = (slotIndex: number) => {
    setCurrentBand((prev) => ({
      ...prev,
      slots: prev.slots.map((s, idx) =>
        idx === slotIndex ? { ...s, locked: !s.locked } : s
      ),
    }));
  };

  const handleRerollSlot = (slotIndex: number) => {
    const updated = rerollSingleSlot(currentBand, slotIndex, vibe);
    setCurrentBand(updated);
    pushToHistory(updated);
  };

  const handleCustomWord = (slotIndex: number, value: string) => {
    const updated = updateSlotCustomValue(currentBand, slotIndex, value);
    setCurrentBand(updated);
  };

  const isSaved = savedBands.some(
    (b) => b.name === currentBand.name && b.genre.name === currentBand.genre.name
  );

  const handleToggleSave = () => {
    if (isSaved) {
      setSavedBands((prev) =>
        prev.filter(
          (b) => !(b.name === currentBand.name && b.genre.name === currentBand.genre.name)
        )
      );
    } else {
      setSavedBands((prev) => [currentBand, ...prev]);
    }
  };

  const handleCopyBand = async (band: GeneratedBand) => {
    const text = buildBandPressText(band);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(band.id);
      window.setTimeout(() => {
        setCopiedId((cur) => (cur === band.id ? null : cur));
      }, 2000);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  const handleLoadBand = (band: GeneratedBand) => {
    setCurrentBand(band);
    document.getElementById('generador')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedBands((prev) => prev.filter((b) => b.id !== id));
  };

  const handleClearSaved = () => {
    setSavedBands([]);
  };

  // Spacebar shortcut when not typing in form controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        tag === 'BUTTON' ||
        tag === 'A'
      ) {
        return;
      }
      e.preventDefault();
      handleGenerateBand();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleGenerateBand]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F4] text-[#111113]">
      {/* Strict 3-Zone Top Bar */}
      <header className="border-b border-[#DCDCD6] bg-[#F6F6F4]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#generador"
            className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#111113] whitespace-nowrap shrink-0"
          >
            Prensa Sonora
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57575E]"
          >
            <a
              href="#generador"
              className="hover:text-[#111113] transition-colors whitespace-nowrap shrink-0"
            >
              Generador
            </a>
            <a
              href="#mezclador"
              className="hover:text-[#111113] transition-colors whitespace-nowrap shrink-0"
            >
              Mezclador
            </a>
            <a
              href="#generos"
              className="hover:text-[#111113] transition-colors whitespace-nowrap shrink-0"
            >
              Géneros
            </a>
            <a
              href="#archivo"
              className="hover:text-[#111113] transition-colors whitespace-nowrap shrink-0 tabular-nums"
            >
              Archivo ({savedBands.length})
            </a>
          </nav>

          <button
            type="button"
            onClick={handleGenerateBand}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium bg-[#111113] text-white hover:bg-[#D62828] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
          >
            <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Generar banda</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Workspace Filter & Formula Bar */}
        <section
          aria-label="Controles de generación"
          className="mb-8 pb-6 border-b border-[#DCDCD6] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtro de escena">
            {VIBE_OPTIONS.map((option) => {
              const active = vibe === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleVibeChange(option.id)}
                  className={`px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828] ${
                    active
                      ? 'bg-[#111113] text-white'
                      : 'bg-white text-[#57575E] border border-[#DCDCD6] hover:text-[#111113] hover:border-[#111113]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <label htmlFor="formula-select" className="text-xs font-medium text-[#57575E] whitespace-nowrap">
              Estructura:
            </label>
            <select
              id="formula-select"
              value={formulaSelection}
              onChange={(e) => handleFormulaChange(e.target.value as FormulaId | 'aleatorio')}
              className="px-3 py-2 text-xs font-medium bg-white text-[#111113] border border-[#DCDCD6] focus:outline-none focus:border-[#111113] cursor-pointer"
            >
              <option value="aleatorio">Combinación aleatoria</option>
              {FORMULA_OPTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Main Generator Split Stage */}
        <section id="generador" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Band Identity, Invented Genre, Controls, Word Mixer */}
          <div className="lg:col-span-7 bg-white border border-[#DCDCD6] p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#57575E] mb-3">
                <span>Banda ficticia</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{currentBand.formulaLabel}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBand.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1
                    className="font-display font-extrabold tracking-tight text-[#111113] leading-[1.03]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {currentBand.name}
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Invented Genre Spotlight */}
              <div className="mt-8 pt-6 border-t border-[#EAEAE4]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-xs font-mono text-[#D62828] font-medium">
                    Género musical inventado
                  </span>
                  <span className="text-xs font-mono text-[#57575E] tabular-nums">
                    {currentBand.genre.bpm} BPM · Compás {currentBand.genre.timeSignature}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111113] tracking-tight mt-2">
                  {currentBand.genre.name}
                </h2>

                <p className="text-sm sm:text-base text-[#57575E] mt-2.5 leading-relaxed max-w-2xl">
                  {currentBand.genre.description}
                </p>
              </div>

              {/* Primary Action Row */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateBand}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#D62828] text-white hover:bg-[#B81D1D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111113]"
                >
                  <Disc3 className="w-4 h-4" aria-hidden="true" />
                  <span>Generar banda</span>
                </button>

                <button
                  type="button"
                  onClick={handleRerollGenreOnly}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white text-[#111113] border border-[#DCDCD6] hover:border-[#111113] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Cambiar género</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleSave}
                  aria-pressed={isSaved}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828] ${
                    isSaved
                      ? 'bg-[#111113] text-white border-[#111113]'
                      : 'bg-white text-[#111113] border-[#DCDCD6] hover:border-[#111113]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isSaved ? 'Guardada' : 'Guardar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyBand(currentBand)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white text-[#111113] border border-[#DCDCD6] hover:border-[#111113] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
                >
                  {copiedId === currentBand.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D62828]" aria-hidden="true" />
                      <span>Ficha copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copiar ficha</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Word Slot Mixer */}
            <div id="mezclador">
              <WordMixerPanel
                slots={currentBand.slots}
                onToggleLock={handleToggleLock}
                onRerollSlot={handleRerollSlot}
                onCustomWord={handleCustomWord}
              />
            </div>
          </div>

          {/* Right Column: Vinyl Sleeve Preview */}
          <div className="lg:col-span-5">
            <VinylSleeve band={currentBand} />
          </div>
        </section>

        {/* Full-Width 4-Column Discography Strip */}
        <section
          aria-label="Ficha de lanzamiento debut"
          className="mt-8 bg-white border border-[#DCDCD6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAEAE4]"
        >
          <div className="p-5">
            <div className="text-xs font-mono text-[#57575E]">Año y origen</div>
            <div className="font-display font-bold text-lg text-[#111113] mt-1 tabular-nums">
              {currentBand.year} · {currentBand.city}
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-mono text-[#57575E]">Sello independiente</div>
            <div className="font-display font-bold text-lg text-[#111113] mt-1 truncate">
              {currentBand.label}
            </div>
          </div>

          <div className="p-5 sm:col-span-2">
            <div className="text-xs font-mono text-[#57575E]">
              Lista de temas (Cara A)
            </div>
            <ol className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-[#111113]">
              {currentBand.tracks.map((track, idx) => (
                <li key={track} className="inline-flex items-baseline gap-1.5">
                  <span className="font-mono text-xs text-[#57575E] tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{track}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Invented Genre Explorer */}
        <GenreExplorer
          currentGenre={currentBand.genre}
          vibe={vibe}
          onSelectGenre={handleSelectGenre}
        />

        {/* Saved Archive & Recent History */}
        <BandArchive
          savedBands={savedBands}
          recentHistory={history}
          activeBandId={currentBand.id}
          copiedId={copiedId}
          onLoadBand={handleLoadBand}
          onCopyBand={handleCopyBand}
          onRemoveSaved={handleRemoveSaved}
          onClearSaved={handleClearSaved}
        />
      </main>

      <footer className="border-t border-[#DCDCD6] bg-[#F6F6F4] py-6">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#57575E]">
          <span>Prensa Sonora · Generador combinatorio de bandas y subgéneros</span>
          <span>Atajo: pulsa la barra espaciadora para generar una nueva banda</span>
        </div>
      </footer>
    </div>
  );
}
