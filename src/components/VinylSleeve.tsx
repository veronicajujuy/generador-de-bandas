import { useRef } from 'react';
import { Download } from 'lucide-react';
import { GeneratedBand } from '../types/band';

interface VinylSleeveProps {
  band: GeneratedBand;
}

export function VinylSleeve({ band }: VinylSleeveProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { cover } = band;

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const slug = band.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-');
    link.download = `${slug || 'banda'}-${band.catalogCode.toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderMotif = () => {
    switch (cover.motif) {
      case 'concentric':
        return (
          <g>
            <circle cx="220" cy="220" r="145" fill="none" stroke={cover.fgHex} strokeWidth="2" opacity="0.25" />
            <circle cx="220" cy="220" r="110" fill="none" stroke={cover.fgHex} strokeWidth="6" />
            <circle cx="220" cy="220" r="72" fill={cover.accentHex} />
            <circle cx="220" cy="220" r="24" fill={cover.bgHex} />
          </g>
        );
      case 'diagonal':
        return (
          <g>
            <polygon points="0,440 440,120 440,260 0,440" fill={cover.accentHex} />
            <line x1="0" y1="360" x2="440" y2="40" stroke={cover.fgHex} strokeWidth="8" />
            <line x1="0" y1="390" x2="440" y2="70" stroke={cover.fgHex} strokeWidth="2" opacity="0.45" />
            <rect x="44" y="130" width="96" height="96" fill={cover.fgHex} />
          </g>
        );
      case 'grid':
        return (
          <g>
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const isAccent = (row + col) % 3 === 0;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={44 + col * 88}
                    y={110 + row * 68}
                    width="74"
                    height="54"
                    fill={isAccent ? cover.accentHex : 'none'}
                    stroke={cover.fgHex}
                    strokeWidth="2"
                    opacity={isAccent ? 1 : 0.35}
                  />
                );
              })
            )}
          </g>
        );
      case 'split':
        return (
          <g>
            <rect x="0" y="190" width="440" height="250" fill={cover.accentHex} />
            <circle cx="220" cy="190" r="88" fill={cover.fgHex} />
            <rect x="132" y="190" width="176" height="88" fill={cover.bgHex} />
          </g>
        );
      case 'monolith':
        return (
          <g>
            <rect x="150" y="104" width="140" height="240" fill={cover.fgHex} />
            <rect x="180" y="134" width="80" height="180" fill={cover.accentHex} />
            <line x1="40" y1="224" x2="400" y2="224" stroke={cover.bgHex} strokeWidth="4" />
          </g>
        );
      case 'orbit':
      default:
        return (
          <g transform={`rotate(${cover.rotationDeg} 220 230)`}>
            <ellipse cx="220" cy="230" rx="165" ry="62" fill="none" stroke={cover.fgHex} strokeWidth="3" />
            <ellipse cx="220" cy="230" rx="115" ry="40" fill="none" stroke={cover.accentHex} strokeWidth="5" />
            <circle cx="220" cy="230" r="36" fill={cover.accentHex} />
            <circle cx="335" cy="230" r="10" fill={cover.fgHex} />
          </g>
        );
    }
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white border border-[#DCDCD6] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#EAEAE4]">
        <div className="text-xs font-mono text-[#57575E] tabular-nums">
          <span>EDICIÓN LP</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{band.catalogCode}</span>
        </div>
        <button
          type="button"
          onClick={handleDownloadSvg}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#111113] hover:text-[#D62828] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828]"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Descargar portada</span>
        </button>
      </div>

      {/* Sleeve + peeking vinyl */}
      <div className="my-6 flex items-center justify-center">
        <div className="relative w-full max-w-[380px] pr-10 sm:pr-14">
          {/* Vinyl disc peeking out */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 right-0 aspect-square rounded-full border border-black/30 flex items-center justify-center transition-transform duration-300"
            style={{ backgroundColor: cover.vinylHex }}
          >
            <div className="w-[84%] h-[84%] rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-[70%] h-[70%] rounded-full border border-white/10 flex items-center justify-center">
                <div
                  className="w-[38%] h-[38%] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: cover.accentHex }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#F6F6F4]" />
                </div>
              </div>
            </div>
          </div>

          {/* Square cover SVG */}
          <div className="relative z-10 aspect-square w-full border border-black/15 shadow-sm overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 440 440"
              className="w-full h-full block"
              role="img"
              aria-label={`Portada ficticia del álbum ${band.albumTitle} de ${band.name}`}
            >
              <rect width="440" height="440" fill={cover.bgHex} />

              {/* Geometric Artwork */}
              {renderMotif()}

              {/* Top band & catalog strip */}
              <rect x="0" y="0" width="440" height="82" fill={cover.bgHex} fillOpacity="0.88" />
              <text
                x="28"
                y="38"
                fill={cover.fgHex}
                fontFamily="Archivo, sans-serif"
                fontWeight="800"
                fontSize="22"
                letterSpacing="-0.5"
              >
                {band.name.length > 26 ? `${band.name.slice(0, 25)}…` : band.name}
              </text>
              <text
                x="28"
                y="62"
                fill={cover.accentHex}
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                fontSize="11"
              >
                {`${band.genre.name.toUpperCase()} · ${band.year}`}
              </text>

              {/* Bottom sleeve footer */}
              <rect x="0" y="382" width="440" height="58" fill={cover.bgHex} fillOpacity="0.9" />
              <line x1="28" y1="382" x2="412" y2="382" stroke={cover.fgHex} strokeOpacity="0.25" strokeWidth="1" />
              <text
                x="28"
                y="412"
                fill={cover.fgHex}
                fontFamily="DM Sans, sans-serif"
                fontWeight="500"
                fontSize="13"
              >
                {band.albumTitle.length > 34 ? `${band.albumTitle.slice(0, 33)}…` : band.albumTitle}
              </text>
              <text
                x="412"
                y="412"
                textAnchor="end"
                fill={cover.fgHex}
                fillOpacity="0.7"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
              >
                {band.catalogCode}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Sleeve Metadata Strip (Zero-pill clean text) */}
      <div className="pt-5 border-t border-[#EAEAE4] grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
        <div>
          <div className="text-[#57575E]">Álbum debut</div>
          <div className="font-medium text-[#111113] mt-0.5 truncate" title={band.albumTitle}>
            {band.albumTitle}
          </div>
        </div>
        <div>
          <div className="text-[#57575E]">Sello y origen</div>
          <div className="font-medium text-[#111113] mt-0.5 truncate">
            {band.label} · {band.city}
          </div>
        </div>
      </div>
    </div>
  );
}
