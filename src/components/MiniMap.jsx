import React from 'react';
import { ExternalLink } from 'lucide-react';

const MiniMap = ({ coords, regionName }) => {
    const delta = 0.05;
    const lat = coords?.lat || 0;
    const lng = coords?.lng || 0;

    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    return (
        <div className="w-full h-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden mb-6 relative group z-0">
            <iframe width="100%" height="100%" src={src} style={{ border: 0 }} title="Location Map" loading="lazy"
                className="opacity-90 group-hover:opacity-100 transition-opacity"></iframe>

            <a href={mapLink} target="_blank" rel="noreferrer"
                className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg shadow-sm text-blue-600 hover:bg-white hover:text-blue-700 text-xs font-bold flex items-center gap-1 z-10 transition-colors">
                <ExternalLink size={12} />
                Open Map
            </a>

            <div
                className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-600 shadow-sm pointer-events-none z-10">
                {regionName}
            </div>
        </div>
    );
};

export default MiniMap;
