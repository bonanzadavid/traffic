import React from 'react';
import {
    ChevronRight, Globe, Siren, Info, MapPin,
    AlertTriangle, Bell, Fuel, XCircle, Radio
} from 'lucide-react';

const RuleCard = ({ rule }) => {
    const IconComponent = {
        "corner-up-right": ChevronRight,
        "gauge": Globe,
        "bus": (props) => <Globe {...props} />, // Original used Car, but let's stick to what's available or use Siren
        "siren": Siren,
        "wine": Info,
        "square-parking": MapPin,
        "lightbulb": Info,
        "alert-triangle": AlertTriangle,
        "bike": Siren, // Simplified fallback
        "snowflake": Info,
        "volume-2": Bell,
        "corner-up-left": ChevronRight,
        "shield-check": Info,
        "fuel": Fuel,
        "ban": XCircle,
        "radio": Radio,
        "arrow-up": ChevronRight,
        "circle-dashed": Globe,
        "footprints": Info,
        "truck": Siren,
        "arrow-left-right": (props) => <Globe {...props} />,
        "cloud-rain": Info,
        "shirt": Info,
        "train-track": Info,
        "octagon": AlertTriangle,
        "file-text": (props) => <Info {...props} />,
        "wrench": (props) => <Info {...props} />
    }[rule.icon] || Info;

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow mb-3">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
                    <IconComponent size={18} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {rule.category}
                        </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{rule.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{rule.description}</p>
                </div>
            </div>
        </div>
    );
};

export default RuleCard;
