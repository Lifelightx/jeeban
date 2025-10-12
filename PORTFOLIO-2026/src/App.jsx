// App.jsx
import { useState } from 'react';
import Sidebar from './components/Editor/Sidebar';
import TabBar from './components/Editor/Tabbar';
import CodeEditor from './components/Editor/CodeEditor';
import Terminal from './components/Editor/Terminal';
import './App.css'
function App() {
  const [activeFile, setActiveFile] = useState('README.md');
  const [openFiles, setOpenFiles] = useState(['README.md']);

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] text-gray-300">
      {/* Sidebar */}
      <Sidebar
        onFileClick={(file) => {
          setActiveFile(file);
          if (!openFiles.includes(file)) {
            setOpenFiles([...openFiles, file]);
          }
        }}
      />

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        <TabBar
          openFiles={openFiles}
          activeFile={activeFile}
          onTabClick={setActiveFile}
          onTabClose={(file) => {
            const updatedFiles = openFiles.filter(f => f !== file);
            setOpenFiles(updatedFiles);

            // If the closed file was active
            if (activeFile === file) {
              if (updatedFiles.length > 0) {
                // Switch to the last open file
                setActiveFile(updatedFiles[updatedFiles.length - 1]);
              } else {
                // No files left — clear the editor
                setActiveFile(null);
              }
            }
          }}

        />
        <CodeEditor activeFile={activeFile} />
        <Terminal />
      </div>
    </div>
  );
}

export default App;