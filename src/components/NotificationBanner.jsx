import React from 'react';
import { AlertTriangle, Bell, XCircle } from 'lucide-react';

const NotificationBanner = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 animate-in slide-in-from-top-2 duration-300">
            <div className={`max-w-md mx-auto p-4 rounded-xl shadow-xl flex items-start gap-3 border
        ${notification.type === 'error' ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-blue-600 border-blue-500 text-white'}`}>
                <div className="bg-white/20 p-2 rounded-full">
                    {notification.type === 'error' ?
                        <AlertTriangle className="w-5 h-5" /> :
                        <Bell className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-90">{notification.title}</h4>
                    <p className="text-sm font-medium mt-1">{notification.message}</p>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white">
                    <XCircle className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default NotificationBanner;
