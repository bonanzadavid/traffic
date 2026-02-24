import React from 'react';
import { Car, Signpost } from 'lucide-react';

const QuickStats = ({ regionData }) => (
    <div className="grid grid-cols-2 gap-2 mb-6">
        <div
            className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
            <Car className="w-5 h-5 text-blue-500 mb-1" />
            <span className="text-xs text-slate-500 uppercase font-bold">Side</span>
            <span className="font-bold text-slate-800">{regionData.side}</span>
        </div>
        <div
            className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center">
            <Signpost className="w-5 h-5 text-orange-500 mb-1" />
            <span className="text-xs text-slate-500 uppercase font-bold">Units</span>
            <span className="font-bold text-slate-800">{regionData.units}</span>
        </div>
    </div>
);

export default QuickStats;
