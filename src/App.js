import { useState, useEffect } from 'react';

function App() {
  const [selectedIcon, setSelectedIcon] = useState('🌻');
  const [novelName, setNovelName] = useState('');
  const [basicInfo, setBasicInfo] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [links, setLinks] = useState([
    { name: 'wordpress', url: '' },
    { name: 'wattpad', url: '' }
  ]);
  const [generatedText, setGeneratedText] = useState('');

  const addLink = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const updateLink = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  // Add this new function after updateLink
  const deleteLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const generateText = () => {
    const capitalizedNovelName = novelName.toUpperCase().trim();
    const hashtagName = `#${capitalizedNovelName.replace(/\s+/g, '_')}`;

    const formattedBasicInfo = basicInfo
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .map(line => `${selectedIcon} ${line}`)
      .join('\n\n');

    const introLabel = `${selectedIcon} Giới thiệu:`

    const formattedIntro = introduction
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .join('\n\n');

    const formattedLinks = links
      .filter(link => link.url)
      .map(link => `LINK ${link.name}: ${link.url}`)
      .join('\n\n');

    const result = `${capitalizedNovelName}\n\n${formattedBasicInfo}\n\n${introLabel}\n\n${formattedIntro}\n\n${formattedLinks}\n\n${hashtagName}`;
    setGeneratedText(result);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add useEffect to check system time and update dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const currentHour = new Date().getHours();
      setIsDarkMode(currentHour >= 18 || currentHour < 6); // Dark mode between 6 PM and 6 AM
    };

    checkDarkMode(); // Initial check
    const interval = setInterval(checkDarkMode, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'dark bg-gray-800' : ''}`}>
      <div className='fixed top-0 left-0 w-full h-full z-10 pointer-events-none'>
        <img src='/bg-xs-2.png' className='w-full h-auto sm:hidden xs:block transform xs:scale-110'/>
        <img src="/bg.png" className="w-full h-auto sm:block xs:hidden" />
      </div>
      <div className="relative pt-[200px] px-4 pb-20 z-0">
        <div className={`max-w-2xl mx-auto bg-opacity-90 sm:p-8 xs:p-1 rounded-xl`}>
          <div className="divide-y divide-gray-200">
            <div className={`py-8 text-base leading-6 space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} sm:text-lg sm:leading-7`}>
              <div className={`bg-cover bg-center sm:bg-[url(/public/title.png)] xs:bg-[url(/public/title-xs.png)] h-[7rem] sm:mt-[-3rem] sm:mb-[2rem] xs:mt-[-4.5rem] xs:mb-[-1.5rem]`} />
                <div className="flex flex-col">
                  <label className="leading-loose headline">Chọn Icon</label>
                  <input
                    type="text"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm ${
                      isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
                    } rounded-md focus:outline-none`}
                    value={selectedIcon}
                    onChange={(e) => setSelectedIcon(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose headline">Tên Truyện</label>
                  <input
                    type="text"
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm ${
                      isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'
                    } rounded-md focus:outline-none`}
                    value={novelName}
                    onChange={(e) => setNovelName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose headline">Thông tin cơ bản</label>
                  <textarea
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} `}
                    rows="4"
                    value={basicInfo}
                    onChange={(e) => setBasicInfo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose headline">Giới thiệu</label>
                  <textarea
                    className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} `}
                    rows="6"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <label className="leading-loose headline">Link Truyện</label>
                  {links.map((link, index) => (
                    <div key={index} className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Tên link"
                        className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-1/3 sm:text-sm border-gray-300 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} `}
                        value={link.name}
                        onChange={(e) => updateLink(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        className={`px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-2/3 sm:text-sm border-gray-300 rounded-md focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} `}
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                      />
                      <button
                        className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-800' : 'bg-white hover:bg-white' } text-red-500 px-3 py-2 rounded-md flex items-center justify-center`}
                        onClick={() => deleteLink(index)}
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn-color px-4 py-2 rounded-md w-8 h-8 flex items-center justify-center"
                    onClick={addLink}
                  >
                    +
                  </button>
                </div>

                <div className="pt-4 flex items-center space-x-4">
                  <button
                    className="btn-color flex justify-center items-center w-full px-4 py-3 rounded-md focus:outline-none"
                    onClick={generateText}
                  >
                    TẠO NỘI DUNG
                  </button>
                </div>

                {generatedText && (
                  <div className="mt-4">
                    <textarea
                      readOnly
                      value={generatedText}
                      className="w-full h-40 p-4 border border-gray-300 rounded-md font-mono text-sm"
                      onClick={(e) => e.target.select()}
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
