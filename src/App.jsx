import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMockData } from './data/mockData';
import * as Icons from './components/Icons';
import EditableText from './components/EditableText';
import CommitModal from './components/CommitModal';
import CarouselManagerModal from './components/CarouselManagerModal';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import WritingPage from './pages/WritingPage';

// Main App component (clean and wired to the extracted modules)
export default function App() {
  const mockData = useMockData();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const [isContentEditorActive, setIsContentEditorActive] = useState(false);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);

  // Editable content state
  const [editableHashtags, setEditableHashtags] = useState(mockData.hashtags);
  const [editableThought, setEditableThought] = useState(mockData.admin.thoughtForTheDay);
  const [editableCarouselImages, setEditableCarouselImages] = useState(mockData.admin.carouselImages);
  const [editableAboutMeText, setEditableAboutMeText] = useState(mockData.admin.aboutMeContent);

  const [customFonts, setCustomFonts] = useState(['Inter', 'Roboto', 'Open Sans', 'Georgia', 'Courier New']);

  const blogs = mockData.blogs;
  const aboutMeBoxes = mockData.aboutMeBoxes;
  const admin = {
    ...mockData.admin,
    hashtags: editableHashtags,
    thoughtForTheDay: editableThought,
    carouselImages: editableCarouselImages,
    aboutMeContent: editableAboutMeText,
    setEditableThought,
  };

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const lastTapRef = useRef(0);

  const theme = isDarkTheme ? {
    mainBg: 'bg-gray-900 text-gray-50',
    sectionBg: 'bg-gray-800',
    cardBg: 'bg-gray-700',
    accentBtn: 'bg-lime-400 text-gray-900 hover:bg-lime-500 shadow-lg',
    accentText: 'text-lime-400',
    darkText: 'text-gray-50',
    subtleText: 'text-gray-400',
    borderColor: 'border-lime-700/50',
    headerBg: 'bg-gray-900 shadow-lime-900/50',
    shadow: 'shadow-lg',
  } : {
    mainBg: 'bg-amber-50 text-gray-900',
    sectionBg: 'bg-gray-100',
    cardBg: 'bg-amber-50',
    accentBtn: 'bg-orange-400 text-orange-900 hover:bg-orange-500 shadow-md',
    accentText: 'text-orange-600',
    darkText: 'text-gray-900',
    subtleText: 'text-gray-600',
    borderColor: 'border-gray-300',
    headerBg: 'bg-amber-50 shadow-sm',
    shadow: 'shadow-lg',
  };

  // Auto-advance carousel
  useEffect(() => {
    if (admin.carouselImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % admin.carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [admin.carouselImages.length]);

  const handleNavigation = useCallback((page = null) => {
    if (page) setCurrentPage(page);
    setIsDrawerOpen(false);
  }, []);

  const handleUserIconInteraction = useCallback((event) => {
    const toggleTheme = () => {
      setIsDarkTheme(prev => !prev);
      setIsContentEditorActive(false);
      event.preventDefault();
    };

    if (event.type === 'click' && event.shiftKey) {
      toggleTheme();
      return;
    }

    if (event.type === 'touchstart') {
      const currentTime = new Date().getTime();
      const lastTapTime = lastTapRef.current;
      const tapDelay = currentTime - lastTapTime;
      const DOUBLE_TAP_THRESHOLD = 300;
      if (tapDelay < DOUBLE_TAP_THRESHOLD && tapDelay > 0) {
        toggleTheme();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = currentTime;
      }
    }
  }, []);

  const handleFooterCommitClick = useCallback(() => setIsCommitModalOpen(true), []);
  const handleRemoveHashtag = useCallback((tagToRemove) => { if (!isDarkTheme) return; setEditableHashtags(prev => prev.filter(tag => tag !== tagToRemove)); }, [isDarkTheme]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return (
        <>
          <section onClick={() => isDarkTheme && setIsCarouselModalOpen(true)} className={`relative w-full overflow-hidden rounded-xl shadow-2xl mb-8 border ${theme.borderColor} h-60 md:h-80 ${theme.sectionBg} ${isDarkTheme ? 'cursor-pointer group' : ''}`}>
            {admin.carouselImages.map((image, index) => (
              <div key={image.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentCarouselIndex ? 'opacity-100' : 'opacity-0'}`}>
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{image.alt.includes('(Admin)') ? image.alt.split('(')[0].trim() : image.alt}</p>
                </div>
              </div>
            ))}
            {isDarkTheme && (<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"><div className="p-4 bg-lime-500 text-gray-900 rounded-full flex items-center space-x-2 shadow-xl"><Icons.ImageIcon className="w-6 h-6" /><span className="font-bold">Click to Manage Carousel Images</span></div></div>)}
          </section>

          <section className={`mb-8 p-4 rounded-xl ${theme.sectionBg} shadow-inner`}>
            <h2 className={`text-xl font-bold mb-3 ${theme.darkText}`}>Trending Topics</h2>
            <div className="flex flex-wrap gap-2">
              {admin.hashtags.map((tag, index) => (
                <div key={index} className="relative">
                  <button className={`p-2 text-sm font-semibold rounded-lg ${theme.cardBg} ${theme.subtleText} ${theme.shadow} hover:opacity-80 transition duration-150`}>{tag}</button>
                  {isDarkTheme && (<button onClick={() => handleRemoveHashtag(tag)} className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold transition shadow-md" title={`Remove ${tag}`}>&times;</button>)}
                </div>
              ))}
            </div>
          </section>

          <HomePage blogs={blogs} theme={theme} admin={admin} isDarkTheme={isDarkTheme} handleRemoveHashtag={handleRemoveHashtag} isContentEditorActive={isContentEditorActive} setIsContentEditorActive={setIsContentEditorActive} />
        </>
      );
      case 'AboutMe': return <AboutMePage theme={theme} aboutMeBoxes={aboutMeBoxes} isDarkTheme={isDarkTheme} aboutMeText={editableAboutMeText} onEditClick={() => setCurrentPage('Writing')} />;
      case 'Writing': return <WritingPage theme={theme} aboutMeText={editableAboutMeText} setAboutMeText={setEditableAboutMeText} onCommit={handleFooterCommitClick} customFonts={customFonts} setCustomFonts={setCustomFonts} />;
      default: return <div className={`text-center py-12 ${theme.darkText}`}>Page Not Found.</div>;
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme.mainBg} transition-colors duration-500`}>
      <div className={`fixed inset-0 z-40 transform transition-all duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-900/90 backdrop-blur-sm`} onClick={() => handleNavigation()}>
        <div className={`w-64 h-full shadow-2xl p-6 ${theme.cardBg} overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
          <h2 className={`text-2xl font-bold mb-6 border-b pb-2 ${theme.borderColor}`}>Menu (7)</h2>
          <nav className="space-y-4">
            <button onClick={() => handleNavigation('Home')} className={`block w-full text-left p-3 rounded-lg font-semibold transition ${currentPage === 'Home' ? theme.accentBtn : `${theme.sectionBg} shadow hover:opacity-80 ${theme.darkText}`}`}>Home</button>
            <button className={`block w-full text-left p-3 rounded-lg ${theme.sectionBg} shadow hover:opacity-80 transition ${theme.darkText}`}>Table of Contents</button>
            <button onClick={() => handleNavigation('AboutMe')} className={`block w-full text-left p-3 rounded-lg font-semibold transition ${currentPage === 'AboutMe' || currentPage === 'Writing' ? theme.accentBtn : `${theme.sectionBg} shadow hover:opacity-80 ${theme.darkText}`}`}>About Me</button>
            <button className={`block w-full text-left p-3 rounded-lg ${theme.sectionBg} shadow hover:opacity-80 transition ${theme.darkText}`}>Gallery</button>
            <button className={`block w-full text-left p-3 rounded-lg ${theme.sectionBg} shadow hover:opacity-80 transition ${theme.darkText}`}>Feedback</button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <header className={`flex justify-between items-center py-4 border-b ${theme.borderColor} mb-6 sticky top-0 z-30 ${theme.headerBg}`}>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsDrawerOpen(true)} className={`p-2 rounded-full ${theme.shadow} ${theme.accentBtn}`} title="Open Menu"><Icons.MenuIcon className="w-6 h-6" /></button>

            <img src={admin.myPhotoUrl} alt="My Photo" className={`w-10 h-10 rounded-full object-cover border-2 ${isDarkTheme ? 'border-lime-400' : 'border-orange-400'} shadow-md`} />

            {currentPage === 'Home' && (
              <nav className="hidden md:flex space-x-3">
                {admin.topics.map((topic, index) => (
                  <button key={index} className={`px-3 py-1 text-sm font-medium rounded-full transition duration-150 ${theme.accentBtn}`}>{topic}</button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button className={`p-2 rounded-full ${theme.shadow} ${theme.accentBtn}`} title="View All Hashtags"><Icons.HashIcon className="w-5 h-5" /></button>

            <button onClick={handleUserIconInteraction} onTouchStart={handleUserIconInteraction} className={`p-2 rounded-full ${theme.shadow} ${theme.accentBtn}`} title="About Me (Shift+Click | Double-Tap for Admin Theme)"><Icons.UserIcon className="w-5 h-5" /></button>

            <a href={`mailto:${admin.email}`} className={`p-2 rounded-full ${theme.shadow} ${theme.accentBtn}`} target="_blank" rel="noopener noreferrer" title={`Email: ${admin.email}`}><Icons.MailIcon className="w-5 h-5" /></a>

            <a href={`https://instagram.com/${admin.instagramHandle.replace('@', '')}`} className={`p-2 rounded-full ${theme.shadow} ${theme.accentBtn}`} target="_blank" rel="noopener noreferrer" title={`Instagram: ${admin.instagramHandle}`}><Icons.InstagramIcon className="w-5 h-5" /></a>
          </div>
        </header>

        {renderPage()}

        <footer className={`mt-12 pt-4 border-t ${theme.borderColor} text-center`}>
          <p className={`text-xs ${theme.subtleText}`}>{admin.licensing} (13)</p>
          {isDarkTheme && currentPage !== 'Writing' && (
            <div className="mt-4">
              <button onClick={handleFooterCommitClick} className="px-8 py-3 rounded-full font-bold bg-lime-500 text-gray-900 shadow-xl hover:bg-lime-600 transition">Commit Changes</button>
            </div>
          )}
        </footer>
      </div>

      <CommitModal isOpen={isCommitModalOpen} onClose={() => setIsCommitModalOpen(false)} theme={theme} editableState={{ editableHashtags, editableThought, editableCarouselImages, customFonts, editableAboutMeText }} />
      <CarouselManagerModal isOpen={isCarouselModalOpen} onClose={() => setIsCarouselModalOpen(false)} images={admin.carouselImages} setImages={setEditableCarouselImages} theme={theme} />
    </div>
  );
}
