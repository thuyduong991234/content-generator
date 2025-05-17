import { useState } from 'react';

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

  return (
    <div 
          className="min-h-screen relative">
          {/* <div className='z-10 flex'>
            <div className=" bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/2c54be70469cfb46b3b340080a1e5ab0.png')] w-[200px] h-[400px] bg-top-left"/>
            <div className=" bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/c6511bde00a51e3b9e53e9fd1c375f4c.png')] w-[340px] h-[340px] "></div>
            <div className=" bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/c6511bde00a51e3b9e53e9fd1c375f4c.png')] w-[340px] h-[340px] "></div>
            <div className=" bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/c6511bde00a51e3b9e53e9fd1c375f4c.png')] w-[340px] h-[340px] "></div>
            <div className=" bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/c6511bde00a51e3b9e53e9fd1c375f4c.png')] w-[340px] h-[340px] "></div>
            <div className="bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/c6511bde00a51e3b9e53e9fd1c375f4c.png')] w-[340px] h-[340px] "></div>
            <div className="transform -scale-x-100 bg-no-repeat bg-contain bg-[url('https://kerasanya.my.canva.site/_assets/media/2c54be70469cfb46b3b340080a1e5ab0.png')] w-[200px] h-[400px]"/>
          </div> */}
          <div className='fixed top-0 left-0 w-full h-full z-10 pointer-events-none'>
            <img src='/bg.png' className='w-full h-auto'/>
          </div>
          <div className="relative pt-[200px] px-4 pb-20 z-0">
              <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-8 rounded-xl shadow-xl">
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className='bg-cover bg-center bg-[url(/public/title.png)] h-[7rem] mt-[-1rem]' />
                    <div className="flex flex-col">
                      <label className="leading-loose headline">Chọn Icon</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                        value={selectedIcon}
                        onChange={(e) => setSelectedIcon(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="leading-loose headline">Tên Truyện</label>
                      <input
                        type="text"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                        value={novelName}
                        onChange={(e) => setNovelName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="leading-loose headline">Thông tin cơ bản</label>
                      <textarea
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
                        rows="4"
                        value={basicInfo}
                        onChange={(e) => setBasicInfo(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="leading-loose headline">Giới thiệu</label>
                      <textarea
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
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
                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-1/3 sm:text-sm border-gray-300 rounded-md focus:outline-none"
                            value={link.name}
                            onChange={(e) => updateLink(index, 'name', e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="URL"
                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-2/3 sm:text-sm border-gray-300 rounded-md focus:outline-none"
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                          />
                          <button
                            className="bg-white text-red-500 px-3 py-2 rounded-md hover:bg-white flex items-center justify-center"
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
