import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import pagesData from '../../data/pages.json';

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(pagesData.languages[0]);

    return (
        <div className="relative w-40">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 bg-white backdrop-blur-sm px-5 py-3 border border-gray-100 text-gray-700 hover:text-[#FF4D6D] transition-all relative z-[61] shadow-sm group w-full justify-between
                    ${isOpen ? 'rounded-t-3xl rounded-b-none border-b-transparent shadow-none' : 'rounded-3xl active:scale-95'}
                `}
            >
                <div className="flex items-center gap-2.5">
                    <Globe size={18} className={`${isOpen ? 'text-[#FF4D6D] rotate-12' : 'group-hover:rotate-12'} transition-transform`} />
                    <span className="text-[11px] font-black uppercase tracking-widest">{selectedLang.name}</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#FF4D6D]' : 'text-gray-300'}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute left-0 right-0 top-full w-full bg-white rounded-b-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 border-t-0 p-2 z-[60] animate-slide-down origin-top overflow-hidden">
                        <div className="px-5 py-2 mb-1 border-b border-gray-50/50">
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Language</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto scrollbar-hide py-1">
                            {pagesData.languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-[12px] font-black flex items-center justify-between group transition-all mb-1 last:mb-0 ${selectedLang.code === lang.code
                                        ? 'text-[#FF4D6D] bg-[#FF4D6D]/5'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="uppercase tracking-widest">{lang.name}</span>
                                    {selectedLang.code === lang.code && (
                                        <div className="w-2 h-2 rounded-full bg-[#FF4D6D] shadow-[0_0_10px_#FF4D6D]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;
