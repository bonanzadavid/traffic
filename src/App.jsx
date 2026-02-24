import React, { useState, useMemo } from 'react';
import { Globe, ChevronRight, Locate, Search, Info } from 'lucide-react';
import Header from './components/Header';
import MiniMap from './components/MiniMap';
import SettingsModal from './components/SettingsModal';
import NotificationBanner from './components/NotificationBanner';
import QuickStats from './components/QuickStats';
import RuleCard from './components/RuleCard';
import { TRAFFIC_DATA, US_STATES_LIST } from './constants';

export default function App() {
    const [activeRegion, setActiveRegion] = useState("us_ca");
    const [currentCoords, setCurrentCoords] = useState(TRAFFIC_DATA["us_ca"]?.defaultCoords || { lat: 0, lng: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const [notification, setNotification] = useState(null);
    const [isLocating, setIsLocating] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [apiKey, setApiKey] = useState("");

    const regionData = TRAFFIC_DATA[activeRegion] || TRAFFIC_DATA["us_ca"];

    const usStateOptions = useMemo(() =>
        US_STATES_LIST.map(s => ({
            key: `us_${s.stateCode.toLowerCase()}`,
            name: s.name,
            flag: s.flag
        })).sort((a, b) => a.name.localeCompare(b.name))
        , []);

    const handleManualChange = (e) => {
        const newRegion = e.target.value;
        if (TRAFFIC_DATA[newRegion]) {
            setActiveRegion(newRegion);
            setCurrentCoords(TRAFFIC_DATA[newRegion].defaultCoords);
            triggerNotification(newRegion);
        }
    };

    const detectClosestState = (lat, lng) => {
        let closestKey = "us_ca";
        let minDistance = Infinity;

        Object.entries(TRAFFIC_DATA).forEach(([key, data]) => {
            const dLat = data.defaultCoords.lat - lat;
            const dLng = data.defaultCoords.lng - lng;
            const distance = Math.sqrt(dLat * dLat + dLng * dLng);
            if (distance < minDistance) {
                minDistance = distance;
                closestKey = key;
            }
        });
        return closestKey;
    };

    const processLocation = async (latitude, longitude) => {
        setCurrentCoords({ lat: latitude, lng: longitude });
        let detectedId = null;

        if (apiKey && apiKey.length > 10) {
            try {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
                const data = await response.json();
                if (data.status === 'OK' && data.results.length > 0) {
                    const results = data.results[0].address_components;
                    const country = results.find(c => c.types.includes('country'));
                    if (country && country.short_name === 'US') {
                        const state = results.find(c => c.types.includes('administrative_area_level_1'));
                        if (state) {
                            const stateKey = `us_${state.short_name.toLowerCase()}`;
                            if (TRAFFIC_DATA[stateKey]) detectedId = stateKey;
                        }
                    }
                }
            } catch (err) {
                console.error("Fetch Error", err);
            }
        }

        if (!detectedId) {
            detectedId = detectClosestState(latitude, longitude);
        }

        setIsLocating(false);

        if (detectedId && detectedId !== activeRegion) {
            setActiveRegion(detectedId);
            triggerNotification(detectedId, true);
        } else {
            setNotification({ title: "Found You", message: "Location updated on map.", type: 'info' });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    const handleLocationRequest = () => {
        setIsLocating(true);

        const runIpFallback = async () => {
            try {
                const res = await fetch('https://ipwho.is/');
                const data = await res.json();
                if (data.success) {
                    processLocation(data.latitude, data.longitude);
                } else {
                    throw new Error("IP Lookup failed");
                }
            } catch (e) {
                setIsLocating(false);
                setNotification({
                    title: "Location Access Denied",
                    message: "Browser location is blocked. Please select region manually.",
                    type: 'error'
                });
                setTimeout(() => setNotification(null), 4000);
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    processLocation(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.warn("GPS failed, trying IP fallback:", error.message);
                    runIpFallback();
                }
            );
        } else {
            runIpFallback();
        }
    };

    const triggerNotification = (regionId, isAutoDetected = false) => {
        const data = TRAFFIC_DATA[regionId];
        if (data) {
            setNotification({
                title: isAutoDetected ? "Smart Switch Active" : "Zone Alert",
                message: `Entered ${data.name}. Drive on the ${data.side}. Limits in ${data.units}.`,
                type: 'info'
            });
            setTimeout(() => setNotification(null), 8000);
        }
    };

    const filteredRules = useMemo(() => {
        if (!searchQuery) return regionData.rules;
        const lowerQuery = searchQuery.toLowerCase();
        return regionData.rules.filter(r =>
            r.title.toLowerCase().includes(lowerQuery) ||
            r.description.toLowerCase().includes(lowerQuery) ||
            r.category.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery, regionData]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 relative">
            <Header onOpenSettings={() => setIsSettingsOpen(true)} />
            <NotificationBanner notification={notification} onClose={() => setNotification(null)} />

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}
                apiKey={apiKey}
                setApiKey={setApiKey}
            />

            <main className="max-w-md mx-auto p-4 pt-6">
                <div className="mb-6 space-y-3">
                    <div className="flex items-end gap-2">
                        <div className="flex-1 relative">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block ml-1">
                                Current Location
                            </label>
                            <div className="relative">
                                <select value={activeRegion} onChange={handleManualChange}
                                    className="w-full appearance-none bg-white border border-slate-200 text-slate-800 text-lg font-bold py-3 pl-10 pr-8 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {usStateOptions.map(opt => (
                                        <option key={opt.key} value={opt.key}>{opt.flag} {opt.name}</option>
                                    ))}
                                </select>
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 rotate-90" />
                            </div>
                        </div>

                        <button onClick={handleLocationRequest} disabled={isLocating} className={`h-[54px] px-4
                                    rounded-xl border flex flex-col items-center justify-center transition-all
                                    ${isLocating ? 'bg-slate-100 text-slate-400 border-slate-200'
                                : 'bg-blue-600 text-white border-blue-700 hover:bg-blue-700 shadow-sm'}`}>
                            <Locate className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
                            <span className="text-[10px] font-bold mt-0.5">
                                {isLocating ? '...' : 'LOCATE'}
                            </span>
                        </button>
                    </div>
                </div>

                <MiniMap coords={currentCoords} regionName={regionData.name} />
                <QuickStats regionData={regionData} />

                <div className="space-y-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="text" placeholder="Search rules (e.g., parking, speed)..."
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                        />
                    </div>

                    {filteredRules.length > 0 ? (
                        filteredRules.map((rule, index) => (
                            <RuleCard key={index} rule={rule} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            <p>No rules found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 p-3 text-center text-[10px] text-slate-400 z-40">
                <p>⚠️ Information for reference only. Follow official local road signs and authorities.</p>
            </div>
        </div>
    );
}
