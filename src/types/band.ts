export type VibeFilter = 'todos' | 'garaje' | 'psicodelia' | 'postpunk' | 'cosmico';

export type FormulaId =
  | 'articulo-sustantivo-adjetivo'
  | 'sustantivo-de-sustantivo'
  | 'adjetivo-sustantivo'
  | 'dos-sustantivos'
  | 'prefijo-sustantivo';

export type SlotKind = 'article' | 'noun' | 'noun2' | 'adjective' | 'connector' | 'prefix';

export interface WordSlot {
  id: string;
  role: string;
  kind: SlotKind;
  value: string;
  locked: boolean;
  custom?: boolean;
  nounEntryId?: string;
}

export interface InventedGenre {
  name: string;
  prefix: string;
  root: string;
  modifier: string;
  description: string;
  bpm: number;
  timeSignature: string;
  instrumentation: string;
  venue: string;
}

export interface CoverVisualConfig {
  motif: 'concentric' | 'diagonal' | 'grid' | 'split' | 'monolith' | 'orbit';
  bgHex: string;
  fgHex: string;
  accentHex: string;
  vinylHex: string;
  rotationDeg: number;
}

export interface GeneratedBand {
  id: string;
  name: string;
  formulaId: FormulaId;
  formulaLabel: string;
  vibe: VibeFilter;
  slots: WordSlot[];
  genre: InventedGenre;
  albumTitle: string;
  year: number;
  city: string;
  label: string;
  catalogCode: string;
  tracks: string[];
  cover: CoverVisualConfig;
  createdAt: number;
}
