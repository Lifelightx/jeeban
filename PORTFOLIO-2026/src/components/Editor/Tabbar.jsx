// components/Editor/TabBar.jsx
import { VscClose, VscCode, VscMarkdown } from 'react-icons/vsc';

const TabBar = ({ openFiles, activeFile, onTabClick, onTabClose }) => {
  return (
    <div className="bg-[#2d2d2d] border-b border-[#3e3e42] overflow-hidden">
      <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {openFiles.map((file) => (
          <div
            key={file}
            className={`flex items-center gap-2 px-4 py-2 border-r border-[#3e3e42] cursor-pointer group min-w-fit ${
              activeFile === file
                ? 'bg-[#1e1e1e] text-white'
                : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#1e1e1e]'
            }`}
            onClick={() => onTabClick(file)}
          >
            {file.endsWith('.md') ? (
              <VscMarkdown className="text-blue-400" />
            ) : (
              <VscCode className="text-blue-500" />
            )}
            <span className="text-sm">{file}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(file);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-[#3e3e42] rounded p-0.5"
            >
              <VscClose size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TabBar;