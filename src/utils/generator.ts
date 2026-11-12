import {
  ADJECTIVES,
  ALBUM_TITLES_A,
  ALBUM_TITLES_B,
  AdjectiveEntry,
  BAND_PREFIXES,
  CITIES,
  FORMULA_OPTIONS,
  GENRE_MODIFIERS,
  GENRE_PREFIXES,
  GENRE_ROOTS,
  INSTRUMENTATION_POOL,
  MATERIAL_NOUNS,
  NOUNS,
  NounEntry,
  RECORD_LABELS,
  TIME_SIGNATURES,
  TRACK_OBJECTS,
  TRACK_VERBS,
  VENUE_POOL,
} from '../data/lexicon';
import {
  CoverVisualConfig,
  FormulaId,
  GeneratedBand,
  InventedGenre,
  VibeFilter,
  WordSlot,
} from '../types/band';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickFiltered<T extends { vibes: VibeFilter[] }>(arr: T[], vibe: VibeFilter): T {
  if (vibe === 'todos') return pickRandom(arr);
  const matching = arr.filter((item) => item.vibes.includes(vibe));
  return pickRandom(matching.length > 0 ? matching : arr);
}

function getArticle(noun: NounEntry): string {
  if (noun.plural) return noun.gender === 'f' ? 'Las' : 'Los';
  return noun.gender === 'f' ? 'La' : 'El';
}

function inflectAdjective(adj: AdjectiveEntry, gender: 'm' | 'f', plural: boolean): string {
  if (plural) return gender === 'f' ? adj.f_pl : adj.m_pl;
  return gender === 'f' ? adj.f_sg : adj.m_sg;
}

const COVER_PALETTES: Array<{ bgHex: string; fgHex: string; accentHex: string; vinylHex: string }> = [
  { bgHex: '#111113', fgHex: '#F4F4F0', accentHex: '#D62828', vinylHex: '#1B1B1F' },
  { bgHex: '#EBEAE4', fgHex: '#111113', accentHex: '#D62828', vinylHex: '#151518' },
  { bgHex: '#1B2432', fgHex: '#F3EFE0', accentHex: '#E07A2F', vinylHex: '#11141B' },
  { bgHex: '#241715', fgHex: '#F5EFE6', accentHex: '#E63946', vinylHex: '#15100F' },
  { bgHex: '#141A16', fgHex: '#EFF2EC', accentHex: '#D9A404', vinylHex: '#0D110E' },
  { bgHex: '#F2EDE2', fgHex: '#141416', accentHex: '#1D4ED8', vinylHex: '#141416' },
];

const MOTIFS: CoverVisualConfig['motif'][] = [
  'concentric',
  'diagonal',
  'grid',
  'split',
  'monolith',
  'orbit',
];

export function generateCoverConfig(): CoverVisualConfig {
  const palette = pickRandom(COVER_PALETTES);
  return {
    motif: pickRandom(MOTIFS),
    bgHex: palette.bgHex,
    fgHex: palette.fgHex,
    accentHex: palette.accentHex,
    vinylHex: palette.vinylHex,
    rotationDeg: Math.floor(Math.random() * 24) - 12,
  };
}

export function generateInventedGenre(vibe: VibeFilter = 'todos'): InventedGenre {
  const prefix = pickFiltered(GENRE_PREFIXES, vibe);
  const root = pickFiltered(GENRE_ROOTS, vibe);
  const modifier = pickFiltered(GENRE_MODIFIERS, vibe);

  const modText = root.gender === 'f' ? modifier.f : modifier.m;
  const name = `${prefix.text}${root.word} ${modText}`.replace(/\s+/g, ' ').trim();

  const instrumentation = pickRandom(INSTRUMENTATION_POOL);
  const venue = pickRandom(VENUE_POOL);
  const timeSignature = pickRandom(TIME_SIGNATURES);

  const bpmRanges: Record<VibeFilter, [number, number]> = {
    todos: [84, 168],
    garaje: [128, 174],
    psicodelia: [78, 124],
    postpunk: [108, 146],
    cosmico: [92, 136],
  };
  const [minBpm, maxBpm] = bpmRanges[vibe];
  const bpm = Math.floor(Math.random() * (maxBpm - minBpm + 1)) + minBpm;

  const description = `Fusión de ${root.word.toLowerCase()} con matiz ${modText.toLowerCase()}, articulada mediante ${instrumentation}. Ideal para ${venue}.`;

  return {
    name,
    prefix: prefix.text.trim(),
    root: root.word,
    modifier: modText,
    description,
    bpm,
    timeSignature,
    instrumentation,
    venue,
  };
}

function buildSlotsForFormula(
  formulaId: FormulaId,
  vibe: VibeFilter,
  existingSlots?: WordSlot[]
): { name: string; slots: WordSlot[] } {
  const getLocked = (index: number): WordSlot | undefined => {
    if (!existingSlots) return undefined;
    const slot = existingSlots[index];
    return slot && slot.locked ? slot : undefined;
  };

  if (formulaId === 'articulo-sustantivo-adjetivo') {
    const lockedNoun = getLocked(1);
    const nounEntry = lockedNoun?.nounEntryId
      ? NOUNS.find((n) => n.id === lockedNoun.nounEntryId) ?? pickFiltered(NOUNS, vibe)
      : pickFiltered(NOUNS, vibe);

    const nounValue = lockedNoun ? lockedNoun.value : nounEntry.word;

    const lockedArticle = getLocked(0);
    const articleValue = lockedArticle ? lockedArticle.value : getArticle(nounEntry);

    const lockedAdj = getLocked(2);
    const adjEntry = pickFiltered(ADJECTIVES, vibe);
    const adjValue = lockedAdj
      ? lockedAdj.value
      : inflectAdjective(adjEntry, nounEntry.gender, nounEntry.plural);

    const slots: WordSlot[] = [
      {
        id: 'slot-0',
        role: 'Artículo',
        kind: 'article',
        value: articleValue,
        locked: Boolean(lockedArticle),
        custom: lockedArticle?.custom,
      },
      {
        id: 'slot-1',
        role: 'Sustantivo',
        kind: 'noun',
        value: nounValue,
        locked: Boolean(lockedNoun),
        custom: lockedNoun?.custom,
        nounEntryId: nounEntry.id,
      },
      {
        id: 'slot-2',
        role: 'Adjetivo',
        kind: 'adjective',
        value: adjValue,
        locked: Boolean(lockedAdj),
        custom: lockedAdj?.custom,
      },
    ];

    return {
      name: `${articleValue} ${nounValue} ${adjValue}`.replace(/\s+/g, ' ').trim(),
      slots,
    };
  }

  if (formulaId === 'sustantivo-de-sustantivo') {
    const lockedNoun1 = getLocked(0);
    const noun1 = lockedNoun1?.nounEntryId
      ? NOUNS.find((n) => n.id === lockedNoun1.nounEntryId) ?? pickFiltered(NOUNS, vibe)
      : pickFiltered(NOUNS, vibe);
    const val1 = lockedNoun1 ? lockedNoun1.value : noun1.word;

    const lockedNoun2 = getLocked(2);
    let mat = pickFiltered(MATERIAL_NOUNS, vibe);
    while (mat.word.toLowerCase() === val1.toLowerCase()) {
      mat = pickFiltered(MATERIAL_NOUNS, vibe);
    }
    const val2 = lockedNoun2 ? lockedNoun2.value : mat.word;

    const slots: WordSlot[] = [
      {
        id: 'slot-0',
        role: 'Sustantivo',
        kind: 'noun',
        value: val1,
        locked: Boolean(lockedNoun1),
        custom: lockedNoun1?.custom,
        nounEntryId: noun1.id,
      },
      {
        id: 'slot-1',
        role: 'Nexo',
        kind: 'connector',
        value: 'de',
        locked: true,
      },
      {
        id: 'slot-2',
        role: 'Materia',
        kind: 'noun2',
        value: val2,
        locked: Boolean(lockedNoun2),
        custom: lockedNoun2?.custom,
      },
    ];

    return {
      name: `${val1} de ${val2}`.replace(/\s+/g, ' ').trim(),
      slots,
    };
  }

  if (formulaId === 'adjetivo-sustantivo') {
    const lockedNoun = getLocked(0);
    const nounEntry = lockedNoun?.nounEntryId
      ? NOUNS.find((n) => n.id === lockedNoun.nounEntryId) ?? pickFiltered(NOUNS, vibe)
      : pickFiltered(NOUNS, vibe);
    const val1 = lockedNoun ? lockedNoun.value : nounEntry.word;

    const lockedAdj = getLocked(1);
    const adjEntry = pickFiltered(ADJECTIVES, vibe);
    const val2 = lockedAdj
      ? lockedAdj.value
      : inflectAdjective(adjEntry, nounEntry.gender, nounEntry.plural);

    const slots: WordSlot[] = [
      {
        id: 'slot-0',
        role: 'Sustantivo',
        kind: 'noun',
        value: val1,
        locked: Boolean(lockedNoun),
        custom: lockedNoun?.custom,
        nounEntryId: nounEntry.id,
      },
      {
        id: 'slot-1',
        role: 'Adjetivo',
        kind: 'adjective',
        value: val2,
        locked: Boolean(lockedAdj),
        custom: lockedAdj?.custom,
      },
    ];

    return {
      name: `${val1} ${val2}`.replace(/\s+/g, ' ').trim(),
      slots,
    };
  }

  if (formulaId === 'dos-sustantivos') {
    const lockedNoun1 = getLocked(0);
    const noun1 = lockedNoun1?.nounEntryId
      ? NOUNS.find((n) => n.id === lockedNoun1.nounEntryId) ?? pickFiltered(NOUNS, vibe)
      : pickFiltered(NOUNS, vibe);
    const val1 = lockedNoun1 ? lockedNoun1.value : noun1.word;

    const lockedNoun2 = getLocked(1);
    let noun2 = pickFiltered(NOUNS, vibe);
    while (noun2.word.toLowerCase() === val1.toLowerCase()) {
      noun2 = pickFiltered(NOUNS, vibe);
    }
    const val2 = lockedNoun2 ? lockedNoun2.value : noun2.word;

    const slots: WordSlot[] = [
      {
        id: 'slot-0',
        role: 'Palabra A',
        kind: 'noun',
        value: val1,
        locked: Boolean(lockedNoun1),
        custom: lockedNoun1?.custom,
        nounEntryId: noun1.id,
      },
      {
        id: 'slot-1',
        role: 'Palabra B',
        kind: 'noun2',
        value: val2,
        locked: Boolean(lockedNoun2),
        custom: lockedNoun2?.custom,
        nounEntryId: noun2.id,
      },
    ];

    return {
      name: `${val1} ${val2}`.replace(/\s+/g, ' ').trim(),
      slots,
    };
  }

  // prefijo-sustantivo
  const lockedPrefix = getLocked(0);
  const prefix = pickFiltered(BAND_PREFIXES, vibe);
  const val1 = lockedPrefix ? lockedPrefix.value : prefix.word;

  const lockedNoun = getLocked(1);
  const nounEntry = lockedNoun?.nounEntryId
    ? NOUNS.find((n) => n.id === lockedNoun.nounEntryId) ?? pickFiltered(NOUNS, vibe)
    : pickFiltered(NOUNS, vibe);
  const val2 = lockedNoun ? lockedNoun.value : nounEntry.word;

  const slots: WordSlot[] = [
    {
      id: 'slot-0',
      role: 'Prefijo',
      kind: 'prefix',
      value: val1,
      locked: Boolean(lockedPrefix),
      custom: lockedPrefix?.custom,
    },
    {
      id: 'slot-1',
      role: 'Sustantivo',
      kind: 'noun',
      value: val2,
      locked: Boolean(lockedNoun),
      custom: lockedNoun?.custom,
      nounEntryId: nounEntry.id,
    },
  ];

  return {
    name: `${val1} ${val2}`.replace(/\s+/g, ' ').trim(),
    slots,
  };
}

function generateTracks(): string[] {
  const tracks: string[] = [];
  const usedVerbs = new Set<string>();
  while (tracks.length < 3) {
    const verb = pickRandom(TRACK_VERBS);
    if (usedVerbs.has(verb)) continue;
    usedVerbs.add(verb);
    const obj = pickRandom(TRACK_OBJECTS);
    tracks.push(`${verb} ${obj}`);
  }
  return tracks;
}

export function generateBand(options?: {
  formulaId?: FormulaId | 'aleatorio';
  vibe?: VibeFilter;
  existingSlots?: WordSlot[];
  forceFormulaId?: FormulaId;
}): GeneratedBand {
  const vibe = options?.vibe ?? 'todos';
  const chosenFormula: FormulaId =
    options?.forceFormulaId ??
    (options?.formulaId && options.formulaId !== 'aleatorio'
      ? options.formulaId
      : pickRandom(FORMULA_OPTIONS).id);

  const formulaMeta = FORMULA_OPTIONS.find((f) => f.id === chosenFormula)!;
  const { name, slots } = buildSlotsForFormula(chosenFormula, vibe, options?.existingSlots);
  const genre = generateInventedGenre(vibe);

  const albumTitle = `${pickRandom(ALBUM_TITLES_A)} ${pickRandom(ALBUM_TITLES_B)}`;
  const year = Math.floor(Math.random() * (2026 - 1974 + 1)) + 1974;
  const city = pickRandom(CITIES);
  const label = pickRandom(RECORD_LABELS);
  const catNum = String(Math.floor(Math.random() * 899) + 101);
  const catalogCode = `PS-${catNum}`;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    formulaId: chosenFormula,
    formulaLabel: formulaMeta.label,
    vibe,
    slots,
    genre,
    albumTitle,
    year,
    city,
    label,
    catalogCode,
    tracks: generateTracks(),
    cover: generateCoverConfig(),
    createdAt: Date.now(),
  };
}

export function rerollSingleSlot(
  band: GeneratedBand,
  slotIndex: number,
  vibe: VibeFilter
): GeneratedBand {
  const updatedSlots = band.slots.map((slot, idx) => {
    if (idx === slotIndex) {
      return { ...slot, locked: false, custom: false };
    }
    return { ...slot, locked: true };
  });

  const { name, slots } = buildSlotsForFormula(band.formulaId, vibe, updatedSlots);

  // Restore original lock state on all slots except the rerolled one stays unlocked
  const finalSlots = slots.map((s, idx) => ({
    ...s,
    locked: idx === slotIndex ? false : band.slots[idx]?.locked ?? false,
  }));

  return {
    ...band,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    slots: finalSlots,
    cover: generateCoverConfig(),
  };
}

export function updateSlotCustomValue(
  band: GeneratedBand,
  slotIndex: number,
  newValue: string
): GeneratedBand {
  const finalSlots = band.slots.map((s, idx) =>
    idx === slotIndex ? { ...s, value: newValue, locked: true, custom: true } : s
  );
  const name = finalSlots
    .map((s) => s.value.trim())
    .filter(Boolean)
    .join(' ');

  return {
    ...band,
    name: name || band.name,
    slots: finalSlots,
  };
}

export function buildBandPressText(band: GeneratedBand): string {
  return [
    `${band.name.toUpperCase()}`,
    `Género inventado: ${band.genre.name}`,
    `Descripción sonora: ${band.genre.description}`,
    `Pulso: ${band.genre.bpm} BPM (${band.genre.timeSignature})`,
    `Álbum debut: "${band.albumTitle}" (${band.year})`,
    `Origen y sello: ${band.city} · ${band.label} (${band.catalogCode})`,
    `Temas destacados: 01. ${band.tracks[0]} / 02. ${band.tracks[1]} / 03. ${band.tracks[2]}`,
  ].join('\n');
}
