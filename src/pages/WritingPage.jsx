import React, { useState } from 'react';
import { PaletteIcon, FontSizeIcon, TypeIcon, UploadIcon, BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, HighlighterIcon } from '../components/Icons';

const WritingPage = ({ theme, aboutMeText, setAboutMeText, onCommit, customFonts, setCustomFonts }) => {
  const [appliedFont, setAppliedFont] = useState('Inter');

  const handleSimulatedFontUpload = () => {
    const newFontName = customFonts.length % 2 === 0 ? 'Custom OTF Font' : 'Custom TTF Font';
    let uniqueFontName = newFontName;
    let count = 1;
    while(customFonts.includes(uniqueFontName)) uniqueFontName = `${newFontName} ${count++}`;
    setCustomFonts(prev => [...prev, uniqueFontName]);
    console.log(`Simulated: Added new font ${uniqueFontName} to customFonts state.`);
  };

  const EditingRibbon = () => {
    const iconClass = `w-5 h-5 ${theme.darkText}`;
    const buttonClass = `p-2 rounded-lg transition hover:bg-opacity-70 ${theme.cardBg} shadow-md`;
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

    return (
      <div className={`flex flex-wrap gap-2 p-3 rounded-xl shadow-xl mb-6 sticky top-[68px] z-20 ${theme.sectionBg} border ${theme.borderColor}`}>
        <span className={`text-sm font-semibold mr-4 self-center ${theme.darkText}`}>Editor Tools:</span>

        <button className={buttonClass} title="Font Color"><PaletteIcon className={iconClass} style={{stroke: 'red'}} /></button>
        <button className={buttonClass} title="Font Size"><FontSizeIcon className={iconClass} /></button>

        <div className="relative cursor-pointer">
          <button onClick={() => setIsFontDropdownOpen(prev => !prev)} className={`${buttonClass} flex items-center space-x-1`} title="Font Type">
            <TypeIcon className={iconClass} />
            <span className={`text-xs font-medium ${theme.subtleText}`}>{appliedFont.split(' ')[0]}</span>
          </button>

          {isFontDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 p-2 bg-white text-gray-900 rounded-md shadow-lg z-30 ring-1 ring-gray-200">
              <h4 className="text-xs font-bold mb-1 border-b pb-1">Select Font:</h4>
              {customFonts.map((font, index) => (
                <button key={index} onClick={() => { setAppliedFont(font); setIsFontDropdownOpen(false); }} className={`block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100 transition truncate ${appliedFont === font ? 'bg-lime-200 font-bold' : ''}`} style={{ fontFamily: font }} title={`Use font: ${font}`}>{font}</button>
              ))}
            </div>
          )}
        </div>

        <button className={buttonClass} title="Bold"><BoldIcon className={iconClass} /></button>
        <button className={buttonClass} title="Italics"><ItalicIcon className={iconClass} /></button>
        <button className={buttonClass} title="Underline"><UnderlineIcon className={iconClass} /></button>
        <button className={buttonClass} title="Alignment"><AlignLeftIcon className={iconClass} /></button>
        <button className={buttonClass} title="Highlight Color"><HighlighterIcon className={iconClass} /></button>

        <button onClick={handleSimulatedFontUpload} className={`flex items-center space-x-1 px-3 ${buttonClass} hover:bg-lime-900 ${theme.darkText}`} title="Upload OTF/TTF Files (Simulated)">
          <UploadIcon className="w-5 h-5" />
          <span className="text-xs font-medium">Font (.ttf/.otf)</span>
        </button>
      </div>
    );
  };

  return (
    <div className={`p-6 rounded-xl shadow-xl ${theme.sectionBg} border ${theme.borderColor}`}>
      <h1 className={`text-4xl font-extrabold mb-6 ${theme.darkText}`}>Editing: About Me Text</h1>

      <EditingRibbon />

      <textarea value={aboutMeText} onChange={(e) => setAboutMeText(e.target.value)} rows="15" className={`w-full p-4 text-lg rounded-lg border ${theme.borderColor} ${theme.cardBg} ${theme.darkText} focus:ring-lime-400 focus:border-lime-400 resize-y`} placeholder="Write your detailed About Me content here..." style={{ fontFamily: appliedFont, transition: 'font-family 0.3s' }} />

      <div className="mt-6 flex justify-end">
        <button onClick={onCommit} className="px-8 py-3 rounded-full font-bold bg-lime-500 text-gray-900 shadow-xl hover:bg-lime-600 transition">Commit Changes</button>
      </div>

      <p className={`text-sm mt-4 ${theme.subtleText} text-center`}>*Committing will publish this text live. Click 'Home' in the menu to return without saving.</p>
    </div>
  );
};

export default WritingPage;
