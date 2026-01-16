import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import pagesData from '../../data/pages.json';

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(pagesData.languages[0]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 text-gray-700 hover:bg-pink-50 hover:text-[#FF4D6D] transition-all active:scale-95 shadow-sm"
            >
                <Globe size={18} />
                <span className="text-xs font-black uppercase tracking-widest">{selectedLang.code}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] animate-fade-in-down">
                    {pagesData.languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setSelectedLang(lang);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between group transition-colors ${selectedLang.code === lang.code ? 'text-[#FF4D6D] bg-pink-50' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {lang.name}
                            {selectedLang.code === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]"></div>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
