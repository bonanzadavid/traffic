import React from 'react';
import { Settings, Key } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, apiKey, setApiKey }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl scale-100">
                <div className="flex items-center gap-3 mb-4 text-slate-800">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                        <Settings size={24} />
                    </div>
                    <h2 className="text-xl font-bold">App Settings</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Key size={14} /> Google Maps API Key (Optional)
                        </label>
                        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Paste AIza... key here"
                            className="w-full p-3 border border-slate-300 rounded-xl text-sm font-mono focus:ring-2
              focus:ring-indigo-500 outline-none"
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            Adding a key enables precise address detection. Without it, we approximate your state based on
                            coordinates.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose}
                        className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
