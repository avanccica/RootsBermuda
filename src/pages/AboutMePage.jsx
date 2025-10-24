import React from 'react';
import { UserIcon, BookOpenIcon, CompassIcon, PencilIcon } from '../components/Icons';

const AboutMePage = ({ theme, aboutMeBoxes, isDarkTheme, aboutMeText, onEditClick }) => {
  const getIcon = (iconName, className) => {
    switch (iconName) {
      case 'User': return <UserIcon className={className} />;
      case 'Book': return <BookOpenIcon className={className} />;
      case 'Compass': return <CompassIcon className={className} />;
      default: return <UserIcon className={className} />;
    }
  };

  return (
    <section className={`relative mb-8 p-6 rounded-xl ${theme.sectionBg} shadow-lg border ${theme.borderColor}`}>
      <h1 className={`text-4xl font-extrabold mb-2 ${theme.darkText}`}>About Me & My Vision</h1>
      <p className={`${theme.subtleText} mb-8 max-w-4xl text-lg whitespace-pre-wrap`}>{aboutMeText}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {aboutMeBoxes.map((box, index) => (
          <div key={index} className={`w-full aspect-square ${theme.cardBg} rounded-xl shadow-xl border ${theme.borderColor} overflow-hidden flex flex-col transition duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer`} style={{ maxWidth: '300px', margin: '0 auto' }}>
            <div className="flex-grow overflow-hidden relative">
              <img src={box.imageUrl} alt={box.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className={`absolute top-0 right-0 p-3 rounded-bl-xl ${theme.accentBtn}`}>{getIcon(box.icon, 'w-6 h-6')}</div>
            </div>

            <div className={`p-4 text-center border-t ${theme.borderColor} ${theme.cardBg}`}>
              <h3 className={`text-xl font-bold ${theme.accentText} mb-0.5`}>{box.title}</h3>
              <p className={`text-base ${theme.subtleText}`}>{box.label}</p>
            </div>
          </div>
        ))}
      </div>

      {isDarkTheme && (
        <button onClick={onEditClick} className={`absolute bottom-4 right-4 p-3 rounded-full ${theme.accentBtn} shadow-lg transition duration-300 hover:scale-110`} title="Edit About Me Text">
          <PencilIcon className="w-6 h-6" />
        </button>
      )}
    </section>
  );
};

export default AboutMePage;
