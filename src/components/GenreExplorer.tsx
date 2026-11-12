import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import { GENRE_MODIFIERS, GENRE_PREFIXES, GENRE_ROOTS } from '../data/lexicon';
import { InventedGenre, VibeFilter } from '../types/band';
import { generateInventedGenre } from '../utils/generator';

interface GenreExplorerProps {
  currentGenre: InventedGenre;
  vibe: VibeFilter;
  onSelectGenre: (genre: InventedGenre) => void;
}

export function GenreExplorer({ currentGenre, vibe, onSelectGenre }: GenreExplorerProps) {
  const [samples, setSamples] = useState<InventedGenre[]>(() =>
    Array.from({ length: 6 }, () => generateInventedGenre(vibe))
  );

  const refreshSamples = () => {
    setSamples(Array.from({ length: 6 }, () => generateInventedGenre(vibe)));
  };

  const assignByRoot = (rootWord: string, gender: 'm' | 'f') => {
    const prefix = GENRE_PREFIXES[Math.floor(Math.random() * GENRE_PREFIXES.length)];
    const modifier = GENRE_MODIFIERS[Math.floor(Math.random() * GENRE_MODIFIERS.length)];
    const modText = gender === 'f' ? modifier.f : modifier.m;
    const base = generateInventedGenre(vibe);
    const name = `${prefix.text}${rootWord} ${modText}`.replace(/\s+/g, ' ').trim();
    onSelectGenre({
      ...base,
      name,
      prefix: prefix.text.trim(),
      root: rootWord,
      modifier: modText,
      description: `Fusión de ${rootWord.toLowerCase()} con matiz ${modText.toLowerCase()}, articulada mediante ${base.instrumentation}. Ideal para ${base.venue}.`,
    });
  };

  return (
    <section id="generos" className="py-12 border-t border-[#DCDCD6]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-mono text-[#57575E] mb-2">
            Taxonomía sonora aleatoria
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
            Catálogo de géneros inventados
          </h2>
          <p className="text-sm sm:text-base text-[#57575E] mt-1.5 max-w-2xl">
            Cada subgénero nace al cruzar un prefijo de escena, una raíz musical y un matiz técnico o geográfico. Selecciona una raíz o elige una muestra para asignársela a la banda actual.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshSamples}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-[#111113] text-[#111113] bg-white hover:bg-[#111113] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
        >
          <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Mezclar muestras</span>
        </button>
      </div>

      {/* Root quick-buttons */}
      <div className="mb-8">
        <div className="text-xs font-medium text-[#57575E] mb-2.5">
          Generar género partiendo de una raíz:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {GENRE_ROOTS.map((root) => {
            const isActive = currentGenre.root === root.word;
            return (
              <button
                key={root.word}
                type="button"
                onClick={() => assignByRoot(root.word, root.gender)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828] ${
                  isActive
                    ? 'bg-[#D62828] text-white border-[#D62828]'
                    : 'bg-white text-[#111113] border-[#DCDCD6] hover:border-[#111113]'
                }`}
              >
                {root.word}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Generated Genre Samples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map((sample, idx) => (
          <div
            key={`${sample.name}-${idx}`}
            className="bg-white border border-[#DCDCD6] p-5 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="text-xs font-mono text-[#57575E] tabular-nums mb-1.5">
                <span>{sample.bpm} BPM</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>{sample.timeSignature}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#111113] tracking-tight">
                {sample.name}
              </h3>
              <p className="text-sm text-[#57575E] mt-2 leading-relaxed">
                {sample.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#EAEAE4] flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-[#57575E] truncate">
                {sample.prefix} / {sample.root}
              </span>
              <button
                type="button"
                onClick={() => onSelectGenre(sample)}
                className="text-xs font-medium text-[#D62828] hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828]"
              >
                Asignar a banda
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
