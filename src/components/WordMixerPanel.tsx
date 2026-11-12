import { useState } from 'react';
import { Lock, Unlock, RefreshCw, Pencil, Check } from 'lucide-react';
import { WordSlot } from '../types/band';

interface WordMixerPanelProps {
  slots: WordSlot[];
  onToggleLock: (index: number) => void;
  onRerollSlot: (index: number) => void;
  onCustomWord: (index: number, value: string) => void;
}

export function WordMixerPanel({
  slots,
  onToggleLock,
  onRerollSlot,
  onCustomWord,
}: WordMixerPanelProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftValue, setDraftValue] = useState<string>('');

  const startEditing = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setDraftValue(currentValue);
  };

  const commitEdit = (index: number) => {
    const trimmed = draftValue.trim();
    if (trimmed) {
      onCustomWord(index, trimmed);
    }
    setEditingIndex(null);
  };

  return (
    <div className="mt-6 pt-6 border-t border-[#DCDCD6]">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-[#57575E]">
          Combinación de palabras (fija o edita cualquier bloque antes de volver a generar)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {slots.map((slot, index) => {
          const isConnector = slot.kind === 'connector';
          const isEditing = editingIndex === index;

          return (
            <div
              key={slot.id}
              className={`border p-3 transition-colors ${
                slot.locked && !isConnector
                  ? 'bg-[#111113] text-white border-[#111113]'
                  : 'bg-[#F6F6F4] text-[#111113] border-[#DCDCD6]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`text-xs font-mono ${
                    slot.locked && !isConnector ? 'text-white/70' : 'text-[#57575E]'
                  }`}
                >
                  {slot.role}
                </span>

                {!isConnector && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onRerollSlot(index)}
                      title="Cambiar solo esta palabra"
                      aria-label={`Cambiar ${slot.role.toLowerCase()}`}
                      className={`p-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828] ${
                        slot.locked
                          ? 'text-white/75 hover:text-white'
                          : 'text-[#57575E] hover:text-[#111113]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => startEditing(index, slot.value)}
                      title="Escribir palabra propia"
                      aria-label={`Editar ${slot.role.toLowerCase()}`}
                      className={`p-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828] ${
                        slot.locked
                          ? 'text-white/75 hover:text-white'
                          : 'text-[#57575E] hover:text-[#111113]'
                      }`}
                    >
                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleLock(index)}
                      title={slot.locked ? 'Soltar palabra' : 'Fijar palabra'}
                      aria-label={slot.locked ? `Soltar ${slot.value}` : `Fijar ${slot.value}`}
                      aria-pressed={slot.locked}
                      className={`p-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D62828] ${
                        slot.locked
                          ? 'text-[#F87171] hover:text-white'
                          : 'text-[#57575E] hover:text-[#D62828]'
                      }`}
                    >
                      {slot.locked ? (
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    commitEdit(index);
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={draftValue}
                    onChange={(e) => setDraftValue(e.target.value)}
                    onBlur={() => commitEdit(index)}
                    autoFocus
                    maxLength={24}
                    className="w-full min-w-0 px-2 py-1 text-sm font-medium bg-white text-[#111113] border border-[#D62828] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Confirmar palabra"
                    className="p-1.5 bg-[#D62828] text-white shrink-0 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="font-display font-bold text-lg tracking-tight truncate">
                  {slot.value}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
