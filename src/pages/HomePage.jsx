import React from 'react';
import EditableText from '../components/EditableText';
import { ImageIcon } from '../components/Icons';

const HomePage = ({ blogs, theme, admin, isDarkTheme, handleRemoveHashtag, isContentEditorActive, setIsContentEditorActive }) => {
  const RecentBlogCard = ({ blog }) => (
    <div className={`p-4 rounded-xl ${theme.shadow} transition duration-300 hover:shadow-xl ${theme.cardBg} cursor-pointer`}>
      <h3 className={`font-serif text-lg font-bold ${theme.darkText} mb-1`}>{blog.title}</h3>
      <p className={`text-sm ${theme.subtleText} line-clamp-2`}>{blog.snippet}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {blog.hashtags.slice(0, 2).map(tag => (
          <span key={tag} className={`text-xs font-medium ${isDarkTheme ? 'text-lime-600 bg-lime-900' : 'text-orange-600 bg-orange-100'} px-2 py-0.5 rounded-full`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="md:col-span-1 space-y-4">
        <h2 className={`text-2xl font-bold ${theme.darkText}`}>Recent Posts (10)</h2>
        {blogs.map((blog) => (
          <RecentBlogCard key={blog.id} blog={blog} />
        ))}
        {blogs.length < 3 && <div className="h-48 bg-transparent"></div>}
      </section>

      <section className="md:col-span-2 space-y-6">
        <div className={`p-6 rounded-xl ${theme.shadow} ${theme.sectionBg} border-l-4 ${isDarkTheme ? 'border-lime-400' : 'border-orange-400'}`}>
          <h2 className={`text-2xl font-serif font-bold mb-2 ${isDarkTheme ? 'text-lime-400' : 'text-orange-800'}`}>Thought for the Day (11)</h2>
          <blockquote className={`italic text-xl ${theme.darkText} flex flex-col`}>
            <EditableText
              tag="span"
              initialValue={`“${admin.thoughtForTheDay.text}”`}
              onChange={(newText) => admin.setEditableThought(prev => ({ ...prev, text: newText.replace(/”|“/g, '') }))}
              isEditable={isDarkTheme}
              onStartEditing={() => isDarkTheme && setIsContentEditorActive(true)}
              onStopEditing={() => isDarkTheme && setIsContentEditorActive(false)}
              className="cursor-pointer mb-2"
            />
          </blockquote>
          <footer className={`text-right text-sm ${theme.subtleText} mt-2`}>
            — <EditableText
              tag="span"
              initialValue={admin.thoughtForTheDay.source}
              onChange={(newSource) => admin.setEditableThought(prev => ({ ...prev, source: newSource }))}
              isEditable={isDarkTheme}
              onStartEditing={() => isDarkTheme && setIsContentEditorActive(true)}
              onStopEditing={() => isDarkTheme && setIsContentEditorActive(false)}
              className="inline-block cursor-pointer"
            />
          </footer>
        </div>

        <div className={`p-6 rounded-xl ${theme.shadow} ${theme.cardBg} h-96 flex flex-col justify-center items-center border ${theme.borderColor}`}>
          <h2 className={`text-3xl font-bold mb-4 ${theme.darkText}`}>My Creative Gallery (12)</h2>
          <p className={`${theme.subtleText} mb-6 text-center`}>A showcase of my latest photography, art, or design work.</p>
          <button className={`text-lg px-8 py-3 rounded-full font-semibold ${theme.shadow} transition duration-300 ${theme.accentBtn}`}>View Full Gallery</button>
          <div className={`text-xs ${theme.subtleText} mt-4`}>(Content here is dynamically updated from your backend.)</div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
