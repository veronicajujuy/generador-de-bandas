import { Copy, Check, Trash2, ArrowUpRight } from 'lucide-react';
import { GeneratedBand } from '../types/band';

interface BandArchiveProps {
  savedBands: GeneratedBand[];
  recentHistory: GeneratedBand[];
  activeBandId: string;
  copiedId: string | null;
  onLoadBand: (band: GeneratedBand) => void;
  onCopyBand: (band: GeneratedBand) => void;
  onRemoveSaved: (id: string) => void;
  onClearSaved: () => void;
}

export function BandArchive({
  savedBands,
  recentHistory,
  activeBandId,
  copiedId,
  onLoadBand,
  onCopyBand,
  onRemoveSaved,
  onClearSaved,
}: BandArchiveProps) {
  return (
    <section id="archivo" className="py-12 border-t border-[#DCDCD6]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Saved Bands Column */}
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#111113]">
                Bandas guardadas
              </h2>
              <p className="text-sm text-[#57575E] mt-1">
                Tu catálogo personal de formaciones ficticias y sus géneros asignados.
              </p>
            </div>

            {savedBands.length > 0 && (
              <button
                type="button"
                onClick={onClearSaved}
                className="text-xs font-medium text-[#57575E] hover:text-[#D62828] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Vaciar archivo
              </button>
            )}
          </div>

          {savedBands.length === 0 ? (
            <div className="bg-white border border-[#DCDCD6] p-8 text-center">
              <p className="text-sm text-[#57575E]">
                Aún no has guardado ninguna banda. Usa el botón «Guardar banda» en la mesa principal para archivar tus combinaciones favoritas.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#DCDCD6] divide-y divide-[#EAEAE4]">
              {savedBands.map((item) => {
                const isCurrent = item.id === activeBandId;
                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2.5">
                        <h3 className="font-display font-bold text-lg text-[#111113] truncate">
                          {item.name}
                        </h3>
                        {isCurrent && (
                          <span className="text-xs font-mono text-[#D62828] shrink-0">
                            En escena
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#57575E] mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-[#111113]">{item.genre.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{item.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.city}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onLoadBand(item)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-[#DCDCD6] text-[#111113] hover:border-[#111113] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Abrir</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onCopyBand(item)}
                        title="Copiar ficha completa"
                        aria-label={`Copiar ficha de ${item.name}`}
                        className="p-2 border border-[#DCDCD6] text-[#57575E] hover:text-[#111113] hover:border-[#111113] transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-[#D62828]" aria-hidden="true" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveSaved(item.id)}
                        title="Eliminar del archivo"
                        aria-label={`Eliminar ${item.name}`}
                        className="p-2 border border-[#DCDCD6] text-[#57575E] hover:text-[#D62828] hover:border-[#D62828] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent History Column */}
        <div className="lg:col-span-5">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#111113]">
              Historial reciente
            </h2>
            <p className="text-sm text-[#57575E] mt-1">
              Últimas combinaciones generadas en esta sesión.
            </p>
          </div>

          <div className="bg-white border border-[#DCDCD6] divide-y divide-[#EAEAE4]">
            {recentHistory.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onLoadBand(item)}
                className="w-full text-left p-4 hover:bg-[#F6F6F4] transition-colors flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-mono text-[#57575E] tabular-nums shrink-0">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="font-display font-bold text-base text-[#111113] group-hover:text-[#D62828] transition-colors truncate">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-xs text-[#57575E] mt-0.5 pl-6 truncate">
                    {item.genre.name} · {item.genre.bpm} BPM
                  </div>
                </div>
                <span className="text-xs font-mono text-[#57575E] shrink-0 tabular-nums">
                  {item.catalogCode}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
