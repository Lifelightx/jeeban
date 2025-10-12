// components/Editor/Sidebar.jsx
import { useState } from 'react';
import {
  FaFolder,
  FaFolderOpen,
  FaMarkdown,
  FaReact,
  FaFileCode,
  FaFile,
  FaJs,
  FaPython,
} from 'react-icons/fa';

const Sidebar = ({ onFileClick }) => {
  const [isOpen, setIsOpen] = useState({
    portfolio: true,
    projects: false,
  });

  const [fileStructure, setFileStructure] = useState([
    {
      name: 'portfolio',
      type: 'folder',
      children: [
        { name: 'README.md', type: 'file', icon: FaMarkdown },
        { name: 'about.jsx', type: 'file', icon: FaReact },
        { name: 'skills.json', type: 'file', icon: FaFileCode },
        {
          name: 'projects',
          type: 'folder',
          children: [
            { name: 'UTKAL-CRAFTS.md', type: 'file', icon: FaMarkdown },
            { name: 'JANA-SAHAYAK.md', type: 'file', icon: FaMarkdown },
          ],
        },
        { name: 'contact.py', type: 'file', icon: FaPython },
        { name: 'playground.js', type: 'file', icon: FaJs },
      ],
    },
  ]);

  const [showInput, setShowInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const toggleFolder = (path) => {
    setIsOpen({ ...isOpen, [path]: !isOpen[path] });
  };

  const handleAddFile = () => {
    setShowInput(true);
  };

  const handleNewFileSubmit = (e) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const updatedStructure = [...fileStructure];
    const portfolioFolder = updatedStructure.find((item) => item.name === 'portfolio');

    // Push new file inside portfolio
    portfolioFolder.children.push({
      name: newFileName,
      type: 'file',
      icon: getIconForFile(newFileName),
    });

    setFileStructure(updatedStructure);
    setShowInput(false);
    setNewFileName('');
  };

  // Helper to choose icon based on file extension
  const getIconForFile = (fileName) => {
    if (fileName.endsWith('.md')) return FaMarkdown;
    if (fileName.endsWith('.jsx')) return FaReact;
    if (fileName.endsWith('.json')) return FaFileCode;
    if (fileName.endsWith('.js')) return FaJs;
    if (fileName.endsWith('.py')) return FaPython;
    return FaFileCode;
  };

  return (
    <div className="w-64 flex-shrink-0 bg-[#252526] border-r border-[#3e3e42] overflow-y-auto">
      <div className="flex items-center justify-between p-2 text-xs text-gray-400 uppercase font-semibold">
        <span className='text-emerald-500'>Explorer</span>
        <button
          onClick={handleAddFile}
          className="text-gray-400 hover:text-white transition-colors"
          title="Create new file"
        >
          <FaFile size={12} />
        </button>
      </div>

      {showInput && (
        <form
          onSubmit={handleNewFileSubmit}
          className="px-2 pb-2 flex items-center gap-2"
        >
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Enter file name..."
            autoFocus
            className="bg-[#1e1e1e] text-white text-sm px-2 py-1 rounded w-full outline-none"
          />
        </form>
      )}

      <FileTree
        items={fileStructure}
        onFileClick={onFileClick}
        isOpen={isOpen}
        toggleFolder={toggleFolder}
      />
    </div>
  );
};

const FileTree = ({ items, onFileClick, isOpen, toggleFolder, level = 0 }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <div
            className="flex items-center gap-2 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer"
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => {
              if (item.type === 'folder') {
                toggleFolder(item.name);
              } else {
                onFileClick(item.name);
              }
            }}
          >
            {item.type === 'folder' ? (
              isOpen[item.name] ? (
                <FaFolderOpen className="text-yellow-500" />
              ) : (
                <FaFolder className="text-yellow-500" />
              )
            ) : (
              <item.icon className="text-blue-500" />
            )}
            <span className="text-sm text-gray-200">{item.name}</span>
          </div>

          {item.type === 'folder' && isOpen[item.name] && (
            <FileTree
              items={item.children}
              onFileClick={onFileClick}
              isOpen={isOpen}
              toggleFolder={toggleFolder}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
