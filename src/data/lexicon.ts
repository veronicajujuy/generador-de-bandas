import { FormulaId, VibeFilter } from '../types/band';

export interface NounEntry {
  id: string;
  word: string;
  gender: 'm' | 'f';
  plural: boolean;
  vibes: VibeFilter[];
}

export interface AdjectiveEntry {
  m_sg: string;
  f_sg: string;
  m_pl: string;
  f_pl: string;
  vibes: VibeFilter[];
}

export interface FormulaOption {
  id: FormulaId;
  label: string;
  pattern: string;
}

export const VIBE_OPTIONS: { id: VibeFilter; label: string }[] = [
  { id: 'todos', label: 'Todos los estilos' },
  { id: 'garaje', label: 'Garaje y Punk' },
  { id: 'psicodelia', label: 'Psicodelia y Stoner' },
  { id: 'postpunk', label: 'Post-Punk y Oscuro' },
  { id: 'cosmico', label: 'Prog y Cósmico' },
];

export const FORMULA_OPTIONS: FormulaOption[] = [
  {
    id: 'articulo-sustantivo-adjetivo',
    label: 'Artículo + Sustantivo + Adjetivo',
    pattern: 'Los Motores Oxidados',
  },
  {
    id: 'sustantivo-de-sustantivo',
    label: 'Sustantivo + de + Sustantivo',
    pattern: 'Catedral de Plomo',
  },
  {
    id: 'adjetivo-sustantivo',
    label: 'Sustantivo + Adjetivo',
    pattern: 'Fiebre Hidráulica',
  },
  {
    id: 'dos-sustantivos',
    label: 'Sustantivo + Sustantivo',
    pattern: 'Búnker Satélite',
  },
  {
    id: 'prefijo-sustantivo',
    label: 'Prefijo / Clave + Sustantivo',
    pattern: 'Doble Voltaje',
  },
];

export const NOUNS: NounEntry[] = [
  { id: 'motores', word: 'Motores', gender: 'm', plural: true, vibes: ['garaje', 'psicodelia'] },
  { id: 'sombras', word: 'Sombras', gender: 'f', plural: true, vibes: ['postpunk', 'psicodelia'] },
  { id: 'catedral', word: 'Catedral', gender: 'f', plural: false, vibes: ['postpunk', 'cosmico'] },
  { id: 'bunker', word: 'Búnker', gender: 'm', plural: false, vibes: ['postpunk', 'garaje'] },
  { id: 'fiebre', word: 'Fiebre', gender: 'f', plural: false, vibes: ['garaje', 'psicodelia'] },
  { id: 'antenas', word: 'Antenas', gender: 'f', plural: true, vibes: ['cosmico', 'postpunk'] },
  { id: 'relampagos', word: 'Relámpagos', gender: 'm', plural: true, vibes: ['garaje', 'psicodelia'] },
  { id: 'satelite', word: 'Satélite', gender: 'm', plural: false, vibes: ['cosmico', 'postpunk'] },
  { id: 'polvora', word: 'Pólvora', gender: 'f', plural: false, vibes: ['garaje'] },
  { id: 'turbinas', word: 'Turbinas', gender: 'f', plural: true, vibes: ['garaje', 'cosmico'] },
  { id: 'espejos', word: 'Espejos', gender: 'm', plural: true, vibes: ['psicodelia', 'postpunk'] },
  { id: 'estatica', word: 'Estática', gender: 'f', plural: false, vibes: ['postpunk', 'cosmico'] },
  { id: 'cenizas', word: 'Cenizas', gender: 'f', plural: true, vibes: ['postpunk', 'psicodelia'] },
  { id: 'voltaje', word: 'Voltaje', gender: 'm', plural: false, vibes: ['garaje', 'cosmico'] },
  { id: 'chacales', word: 'Chacales', gender: 'm', plural: true, vibes: ['garaje'] },
  { id: 'orbita', word: 'Órbita', gender: 'f', plural: false, vibes: ['cosmico', 'psicodelia'] },
  { id: 'fabrica', word: 'Fábrica', gender: 'f', plural: false, vibes: ['postpunk', 'garaje'] },
  { id: 'cables', word: 'Cables', gender: 'm', plural: true, vibes: ['postpunk', 'garaje'] },
  { id: 'desierto', word: 'Desierto', gender: 'm', plural: false, vibes: ['psicodelia'] },
  { id: 'alarmas', word: 'Alarmas', gender: 'f', plural: true, vibes: ['garaje', 'postpunk'] },
  { id: 'cristales', word: 'Cristales', gender: 'm', plural: true, vibes: ['psicodelia', 'cosmico'] },
  { id: 'monolito', word: 'Monolito', gender: 'm', plural: false, vibes: ['psicodelia', 'cosmico'] },
  { id: 'vortice', word: 'Vórtice', gender: 'm', plural: false, vibes: ['cosmico', 'psicodelia'] },
  { id: 'sotano', word: 'Sótano', gender: 'm', plural: false, vibes: ['garaje', 'postpunk'] },
  { id: 'tigres', word: 'Tigres', gender: 'm', plural: true, vibes: ['garaje', 'psicodelia'] },
  { id: 'niebla', word: 'Niebla', gender: 'f', plural: false, vibes: ['postpunk', 'psicodelia'] },
  { id: 'acero', word: 'Acero', gender: 'm', plural: false, vibes: ['garaje', 'postpunk'] },
  { id: 'cometas', word: 'Cometas', gender: 'm', plural: true, vibes: ['cosmico', 'psicodelia'] },
  { id: 'piston', word: 'Pistón', gender: 'm', plural: false, vibes: ['garaje'] },
  { id: 'ecos', word: 'Ecos', gender: 'm', plural: true, vibes: ['postpunk', 'cosmico'] },
  { id: 'cobra', word: 'Cobra', gender: 'f', plural: false, vibes: ['garaje', 'psicodelia'] },
  { id: 'frecuencia', word: 'Frecuencia', gender: 'f', plural: false, vibes: ['cosmico', 'postpunk'] },
  { id: 'ruinas', word: 'Ruinas', gender: 'f', plural: true, vibes: ['postpunk', 'psicodelia'] },
  { id: 'meteoros', word: 'Meteoros', gender: 'm', plural: true, vibes: ['cosmico', 'garaje'] },
  { id: 'valvulas', word: 'Válvulas', gender: 'f', plural: true, vibes: ['garaje', 'cosmico'] },
  { id: 'tambores', word: 'Tambores', gender: 'm', plural: true, vibes: ['psicodelia', 'garaje'] },
  { id: 'horizonte', word: 'Horizonte', gender: 'm', plural: false, vibes: ['cosmico', 'psicodelia'] },
  { id: 'espectros', word: 'Espectros', gender: 'm', plural: true, vibes: ['postpunk'] },
  { id: 'neon', word: 'Neón', gender: 'm', plural: false, vibes: ['postpunk', 'garaje'] },
  { id: 'ciclon', word: 'Ciclón', gender: 'm', plural: false, vibes: ['garaje', 'psicodelia'] },
  { id: 'bruma', word: 'Bruma', gender: 'f', plural: false, vibes: ['postpunk', 'psicodelia'] },
  { id: 'engranajes', word: 'Engranajes', gender: 'm', plural: true, vibes: ['cosmico', 'postpunk'] },
  { id: 'sirenas', word: 'Sirenas', gender: 'f', plural: true, vibes: ['garaje', 'postpunk'] },
  { id: 'kilovatio', word: 'Kilovatio', gender: 'm', plural: false, vibes: ['garaje', 'cosmico'] },
];

export const MATERIAL_NOUNS: { word: string; vibes: VibeFilter[] }[] = [
  { word: 'Plomo', vibes: ['psicodelia', 'garaje'] },
  { word: 'Estática', vibes: ['postpunk', 'cosmico'] },
  { word: 'Neón', vibes: ['postpunk', 'garaje'] },
  { word: 'Mercurio', vibes: ['psicodelia', 'cosmico'] },
  { word: 'Hormigón', vibes: ['postpunk', 'garaje'] },
  { word: 'Cuarzo', vibes: ['cosmico', 'psicodelia'] },
  { word: 'Óxido', vibes: ['garaje', 'postpunk'] },
  { word: 'Azufre', vibes: ['psicodelia', 'garaje'] },
  { word: 'Alquitrán', vibes: ['garaje', 'psicodelia'] },
  { word: 'Silicio', vibes: ['cosmico', 'postpunk'] },
  { word: 'Basalto', vibes: ['psicodelia', 'cosmico'] },
  { word: 'Tungsteno', vibes: ['cosmico', 'postpunk'] },
  { word: 'Vidrio', vibes: ['postpunk', 'psicodelia'] },
  { word: 'Bronce', vibes: ['psicodelia', 'cosmico'] },
  { word: 'Cobalto', vibes: ['cosmico', 'postpunk'] },
  { word: 'Gasolina', vibes: ['garaje'] },
  { word: 'Terciopelo', vibes: ['psicodelia', 'postpunk'] },
  { word: 'Titanio', vibes: ['cosmico', 'garaje'] },
  { word: 'Humo', vibes: ['psicodelia', 'postpunk'] },
  { word: 'Grafito', vibes: ['postpunk', 'cosmico'] },
  { word: 'Uranio', vibes: ['cosmico', 'psicodelia'] },
  { word: 'Salitre', vibes: ['garaje', 'postpunk'] },
  { word: 'Fuego', vibes: ['garaje', 'psicodelia'] },
  { word: 'Cobre', vibes: ['garaje', 'cosmico'] },
];

export const ADJECTIVES: AdjectiveEntry[] = [
  { m_sg: 'Eléctrico', f_sg: 'Eléctrica', m_pl: 'Eléctricos', f_pl: 'Eléctricas', vibes: ['garaje', 'psicodelia'] },
  { m_sg: 'Oxidado', f_sg: 'Oxidada', m_pl: 'Oxidados', f_pl: 'Oxidadas', vibes: ['garaje', 'postpunk'] },
  { m_sg: 'Magnético', f_sg: 'Magnética', m_pl: 'Magnéticos', f_pl: 'Magnéticas', vibes: ['cosmico', 'postpunk'] },
  { m_sg: 'Subterráneo', f_sg: 'Subterránea', m_pl: 'Subterráneos', f_pl: 'Subterráneas', vibes: ['postpunk', 'garaje'] },
  { m_sg: 'Hidráulico', f_sg: 'Hidráulica', m_pl: 'Hidráulicos', f_pl: 'Hidráulicas', vibes: ['garaje', 'cosmico'] },
  { m_sg: 'Nocturno', f_sg: 'Nocturna', m_pl: 'Nocturnos', f_pl: 'Nocturnas', vibes: ['postpunk', 'psicodelia'] },
  { m_sg: 'Sideral', f_sg: 'Sideral', m_pl: 'Siderales', f_pl: 'Siderales', vibes: ['cosmico', 'psicodelia'] },
  { m_sg: 'Silencioso', f_sg: 'Silenciosa', m_pl: 'Silenciosos', f_pl: 'Silenciosas', vibes: ['postpunk', 'cosmico'] },
  { m_sg: 'Salvaje', f_sg: 'Salvaje', m_pl: 'Salvajes', f_pl: 'Salvajes', vibes: ['garaje'] },
  { m_sg: 'Solar', f_sg: 'Solar', m_pl: 'Solares', f_pl: 'Solares', vibes: ['psicodelia', 'cosmico'] },
  { m_sg: 'Áspero', f_sg: 'Áspera', m_pl: 'Ásperos', f_pl: 'Ásperas', vibes: ['garaje', 'postpunk'] },
  { m_sg: 'Analógico', f_sg: 'Analógica', m_pl: 'Analógicos', f_pl: 'Analógicas', vibes: ['cosmico', 'postpunk'] },
  { m_sg: 'Espectral', f_sg: 'Espectral', m_pl: 'Espectrales', f_pl: 'Espectrales', vibes: ['postpunk', 'psicodelia'] },
  { m_sg: 'Térmico', f_sg: 'Térmica', m_pl: 'Térmicos', f_pl: 'Térmicas', vibes: ['cosmico', 'garaje'] },
  { m_sg: 'Blindado', f_sg: 'Blindada', m_pl: 'Blindados', f_pl: 'Blindadas', vibes: ['garaje', 'postpunk'] },
  { m_sg: 'Fugaz', f_sg: 'Fugaz', m_pl: 'Fugaces', f_pl: 'Fugaces', vibes: ['postpunk', 'cosmico'] },
  { m_sg: 'Atómico', f_sg: 'Atómica', m_pl: 'Atómicos', f_pl: 'Atómicas', vibes: ['garaje', 'cosmico'] },
  { m_sg: 'Mineral', f_sg: 'Mineral', m_pl: 'Minerales', f_pl: 'Minerales', vibes: ['psicodelia', 'cosmico'] },
  { m_sg: 'Sonoro', f_sg: 'Sonora', m_pl: 'Sonoros', f_pl: 'Sonoras', vibes: ['garaje', 'cosmico'] },
  { m_sg: 'Inverso', f_sg: 'Inversa', m_pl: 'Inversos', f_pl: 'Inversas', vibes: ['postpunk', 'cosmico'] },
  { m_sg: 'Volátil', f_sg: 'Volátil', m_pl: 'Volátiles', f_pl: 'Volátiles', vibes: ['garaje', 'psicodelia'] },
  { m_sg: 'Gris', f_sg: 'Gris', m_pl: 'Grises', f_pl: 'Grises', vibes: ['postpunk'] },
  { m_sg: 'Incandescente', f_sg: 'Incandescente', m_pl: 'Incandescentes', f_pl: 'Incandescentes', vibes: ['psicodelia', 'garaje'] },
  { m_sg: 'Clandestino', f_sg: 'Clandestina', m_pl: 'Clandestinos', f_pl: 'Clandestinas', vibes: ['garaje', 'postpunk'] },
];

export const BAND_PREFIXES: { word: string; vibes: VibeFilter[] }[] = [
  { word: 'Doble', vibes: ['garaje', 'cosmico'] },
  { word: 'Kilómetro', vibes: ['garaje', 'psicodelia'] },
  { word: 'Proyecto', vibes: ['cosmico', 'postpunk'] },
  { word: 'Estación', vibes: ['cosmico', 'postpunk'] },
  { word: 'Radio', vibes: ['garaje', 'postpunk'] },
  { word: 'Sector', vibes: ['cosmico', 'postpunk'] },
  { word: 'Club', vibes: ['garaje', 'postpunk'] },
  { word: 'Sindicato', vibes: ['garaje', 'postpunk'] },
  { word: 'Laboratorio', vibes: ['cosmico', 'psicodelia'] },
  { word: 'Brigada', vibes: ['garaje'] },
  { word: 'Falso', vibes: ['postpunk', 'garaje'] },
  { word: 'Último', vibes: ['psicodelia', 'postpunk'] },
  { word: 'Triple', vibes: ['garaje', 'cosmico'] },
  { word: 'Señal', vibes: ['cosmico', 'postpunk'] },
];

export const GENRE_PREFIXES: { text: string; vibes: VibeFilter[] }[] = [
  { text: 'Post-', vibes: ['postpunk', 'cosmico'] },
  { text: 'Proto-', vibes: ['garaje', 'psicodelia'] },
  { text: 'Kraut-', vibes: ['cosmico', 'postpunk'] },
  { text: 'Math-', vibes: ['cosmico', 'postpunk'] },
  { text: 'Acid-', vibes: ['psicodelia', 'garaje'] },
  { text: 'Neo-', vibes: ['postpunk', 'psicodelia'] },
  { text: 'Electro-', vibes: ['postpunk', 'cosmico'] },
  { text: 'Noise-', vibes: ['garaje', 'postpunk'] },
  { text: 'Space-', vibes: ['cosmico', 'psicodelia'] },
  { text: 'Lo-Fi ', vibes: ['garaje', 'postpunk'] },
  { text: 'Doom-', vibes: ['psicodelia', 'postpunk'] },
  { text: 'Turbo-', vibes: ['garaje'] },
  { text: 'Micro-', vibes: ['cosmico', 'postpunk'] },
  { text: 'Synth-', vibes: ['postpunk', 'cosmico'] },
  { text: 'Anarco-', vibes: ['garaje'] },
  { text: 'Astro-', vibes: ['cosmico', 'psicodelia'] },
];

export const GENRE_ROOTS: { word: string; gender: 'm' | 'f'; vibes: VibeFilter[] }[] = [
  { word: 'Garaje', gender: 'm', vibes: ['garaje'] },
  { word: 'Shoegaze', gender: 'm', vibes: ['postpunk', 'psicodelia'] },
  { word: 'Stoner', gender: 'm', vibes: ['psicodelia'] },
  { word: 'Bolero', gender: 'm', vibes: ['postpunk', 'psicodelia'] },
  { word: 'Surf', gender: 'm', vibes: ['garaje', 'psicodelia'] },
  { word: 'Tango', gender: 'm', vibes: ['postpunk'] },
  { word: 'Grunge', gender: 'm', vibes: ['garaje'] },
  { word: 'Chicha', gender: 'f', vibes: ['psicodelia', 'garaje'] },
  { word: 'Cumbia', gender: 'f', vibes: ['psicodelia', 'garaje'] },
  { word: 'No-Wave', gender: 'f', vibes: ['postpunk', 'garaje'] },
  { word: 'Prog', gender: 'm', vibes: ['cosmico'] },
  { word: 'Dub', gender: 'm', vibes: ['psicodelia', 'cosmico'] },
  { word: 'Psych', gender: 'm', vibes: ['psicodelia', 'cosmico'] },
  { word: 'Hardcore', gender: 'm', vibes: ['garaje'] },
  { word: 'Flamenco', gender: 'm', vibes: ['psicodelia', 'postpunk'] },
  { word: 'Folk', gender: 'm', vibes: ['psicodelia', 'postpunk'] },
  { word: 'Rockabilly', gender: 'm', vibes: ['garaje'] },
  { word: 'Ambient', gender: 'm', vibes: ['cosmico', 'postpunk'] },
];

export interface GenreModifier {
  m: string;
  f: string;
  vibes: VibeFilter[];
}

export const GENRE_MODIFIERS: GenreModifier[] = [
  { m: 'Hidráulico', f: 'Hidráulica', vibes: ['garaje', 'cosmico'] },
  { m: 'de Transistores', f: 'de Transistores', vibes: ['garaje', 'postpunk'] },
  { m: 'Subterráneo', f: 'Subterránea', vibes: ['postpunk', 'garaje'] },
  { m: 'Analógico', f: 'Analógica', vibes: ['cosmico', 'psicodelia'] },
  { m: 'Nuclear', f: 'Nuclear', vibes: ['garaje', 'cosmico'] },
  { m: 'Barroco', f: 'Barroca', vibes: ['cosmico', 'psicodelia'] },
  { m: 'de Sótanos', f: 'de Sótanos', vibes: ['garaje', 'postpunk'] },
  { m: 'Magnético', f: 'Magnética', vibes: ['cosmico', 'postpunk'] },
  { m: 'Ferroviario', f: 'Ferroviaria', vibes: ['garaje', 'cosmico'] },
  { m: 'Sideral', f: 'Sideral', vibes: ['cosmico', 'psicodelia'] },
  { m: 'de Cinta Abierta', f: 'de Cinta Abierta', vibes: ['psicodelia', 'postpunk'] },
  { m: 'Desértico', f: 'Desértica', vibes: ['psicodelia', 'garaje'] },
  { m: 'Industrial', f: 'Industrial', vibes: ['postpunk', 'garaje'] },
  { m: 'de Alto Voltaje', f: 'de Alto Voltaje', vibes: ['garaje'] },
  { m: 'Cibernético', f: 'Cibernética', vibes: ['cosmico', 'postpunk'] },
  { m: 'Mineral', f: 'Mineral', vibes: ['psicodelia', 'cosmico'] },
  { m: 'Sonámbulo', f: 'Sonámbula', vibes: ['postpunk', 'psicodelia'] },
  { m: 'de Cámara', f: 'de Cámara', vibes: ['cosmico', 'postpunk'] },
];

export const INSTRUMENTATION_POOL: string[] = [
  'guitarras barítonas saturadas con válvulas viejas y cajas de ritmos modificadas',
  'órganos Farfisa pasados por pedales de eco de cinta y bajos con púa metálica',
  'sintetizadores modulares monofónicos en diálogo con baterías grabadas en pasillos de hormigón',
  'riffs de doce cuerdas en afinación abierta sobre percusión de chatarra industrial',
  'baterías motorik sin platillos, bajos distorsionados y radios de onda corta en vivo',
  'teremines caseros, fuzz de germanio y reverberación natural de garaje',
  'guitarras con arco de violín, secuenciadores analógicos y líneas de bajo hipnóticas',
  'baterías secas a doble micrófono y teclados de órgano eléctrico al borde del colapso',
];

export const VENUE_POOL: string[] = [
  'sótanos húmedos con techo bajo y columnas de ladrillo',
  'naves industriales abandonadas a las afueras de la ciudad',
  'clubes nocturnos de neón rojo con sonido cuadrafónico improvisado',
  'festivales en canteras a cielo abierto al caer la tarde',
  'estudios domésticos grabados en cuatro pistas a la madrugada',
  'teatros de barrio reconvertidos en salas de ensayo clandestinas',
  'observatorios en desuso con acústica cavernosa',
  'garajes suburbanos junto a vías de tren de carga',
];

export const TIME_SIGNATURES: string[] = ['4/4 motorik', '7/8 irregular', '6/8 hipnótico', '5/4 angular', '4/4 crudo', '3/4 arrastrado'];

export const CITIES: string[] = [
  'Valparaíso',
  'Ciudad de México',
  'Bilbao',
  'Córdoba',
  'Montevideo',
  'Madrid',
  'Bogotá',
  'Buenos Aires',
  'Lima',
  'Guadalajara',
  'Barcelona',
  'Santiago',
  'Rosario',
  'Monterrey',
  'Sevilla',
  'Medellín',
];

export const RECORD_LABELS: string[] = [
  'Discos Hormigón',
  'Sello Estática',
  'Cinta Roja Records',
  'Archivo Magnético',
  'Frecuencia Sur',
  'Grabaciones del Subsuelo',
  'Ediciones Kilovatio',
  'Monolito Sonoro',
  'Prensa Eléctrica',
  'Válvula Independiente',
];

export const ALBUM_TITLES_A: string[] = [
  'Manual de',
  'Crónicas del',
  'Transmisión desde el',
  'Anatomía de un',
  'Frecuencia de',
  'Último turno en el',
  'Señales bajo el',
  'Volumen II:',
  'Tratado sobre el',
  'Ruido para un',
  'Bitácora del',
  'Ensayos de',
];

export const ALBUM_TITLES_B: string[] = [
  'Silencio Eléctrico',
  'Asfalto Caliente',
  'Segundo Piso',
  'Horizonte de Plomo',
  'Turno Nocturno',
  'Cruce Ferroviario',
  'Invierno Analógico',
  'Pulso Mecánico',
  'Motor Encendido',
  'Circuito Cerrado',
  'Eje Magnético',
  'Lluvia de Tungsteno',
];

export const TRACK_VERBS: string[] = [
  'Arde',
  'Cruza',
  'Vibra',
  'Gira',
  'Cae',
  'Vuelve',
  'Resuena',
  'Despierta',
  'Rompe',
  'Flota',
  'Sube',
  'Corre',
];

export const TRACK_OBJECTS: string[] = [
  'la turbina norte',
  'el último fusible',
  'la señal de medianoche',
  'el puente de hierro',
  'tu sombra en la pista',
  'la aguja del dial',
  'el túnel número cuatro',
  'el eco del garaje',
  'la ciudad sin luces',
  'el cable de cobre',
  'la lluvia ácida',
  'el motor en frío',
];
