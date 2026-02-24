import React from 'react';
import { MapPin, Settings } from 'lucide-react';

const Header = ({ onOpenSettings }) => (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="text-emerald-400" />
                <h1 className="text-xl font-bold tracking-tight">TrafficGuide US</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">
                    v4.0
                </div>
                <button onClick={onOpenSettings} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
                    <Settings className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
            </div>
        </div>
    </header>
);

export default Header;
