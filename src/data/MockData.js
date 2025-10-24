// Mock data (extracted from the monolithic file)
export const useMockData = () => {
  const mockBlogs = [
    { id: 1, title: 'Summer Garden Planning', snippet: 'A quick guide to starting your first summer garden.', date: '2024-09-15', hashtags: ['#gardening', '#diy', '#home', '#summer'] },
    { id: 2, title: 'React Hooks Deep Dive', snippet: 'Understanding useState and useEffect beyond the basics.', date: '2024-09-10', hashtags: ['#code', '#react', '#tech'] },
    { id: 3, title: 'The Best Peach Pie Recipe', snippet: 'My secret ingredient for the perfect flaky crust.', date: '2024-09-05', hashtags: ['#food', '#recipe', '#peach'] },
    { id: 4, title: 'Travel: Road Trip Essentials', snippet: 'What I never leave home without on a long drive.', date: '2024-08-28', hashtags: ['#travel', '#life'] },
    { id: 5, title: 'A Short History of Typography', snippet: 'From Gutenberg to Google Fonts.', date: '2024-08-20', hashtags: ['#design', '#art'] },
  ];

  const mockAdminContent = {
    myPhotoUrl: "https://placehold.co/100x100/fecaca/991b1b?text=My+Photo",
    topics: ['Creativity', 'Lifestyle', 'Tech', 'Food'],
    thoughtForTheDay: {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      source: "Chinese Proverb",
    },
    email: 'myemail@example.com',
    instagramHandle: '@mybloghandle',
    licensing: '© 2024 Your Blog Name. All rights reserved.',
    carouselImages: [
      { id: 1, url: 'https://placehold.co/1200x300/FDBA74/9A3412?text=Carousel+Image+1+(Admin)', alt: 'Inspirational landscape' },
      { id: 2, url: 'https://placehold.co/1200x300/FEB2B2/7F1D1D?text=Carousel+Image+2+(Admin)', alt: 'Coding setup' },
    ],
    aboutMeContent: "Welcome to my space! This blog is built on three core philosophies. My aim is to deliver highly structured, thoughtful content that promotes shared learning and encourages continuous personal and professional growth. This is the main body text you can now edit directly from the Writing page.",
  };

  const recentHashtags = Array.from(new Set(mockBlogs.flatMap(b => b.hashtags))).slice(0, 6);

  const aboutMeBoxes = [
    { title: 'The Architect', label: 'Structured Creativity', imageUrl: 'https://placehold.co/300x300/FEE2E2/EF4444?text=Creative', icon: 'User' },
    { title: 'The Mentor', label: 'Shared Learning', imageUrl: 'https://placehold.co/300x300/FEF9C3/F59E0B?text=Knowledge', icon: 'Book' },
    { title: 'The Explorer', label: 'Continuous Growth', imageUrl: 'https://placehold.co/300x300/D1FAE5/10B981?text=Growth', icon: 'Compass' }
  ];

  return {
    blogs: mockBlogs.slice(0, 3),
    hashtags: recentHashtags,
    admin: mockAdminContent,
    aboutMeBoxes,
  };
};
