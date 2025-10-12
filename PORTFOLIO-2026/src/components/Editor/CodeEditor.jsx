// components/Editor/CodeEditor.jsx
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import about from '../../data/about';
import readme from '../../data/readme';
import skills from '../../data/skills';
import projects from '../../data/projects';
import MarkdownRenderer from '../Markdown/MarkdownRenderer';
import MessageEditor from './MessageEditor';
import contact from '../../data/contact';

const CodeEditor = ({ activeFile }) => {
  const [editableContent, setEditableContent] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (!activeFile) return;

    // Editable files list
    const editableFiles = ['playground.js', 'playground.jsx'];
    setIsEditable(editableFiles.includes(activeFile));

    if (editableFiles.includes(activeFile)) {
      // Load from localStorage or start empty
      const saved = localStorage.getItem(`file_${activeFile}`);
      setEditableContent(saved || '// Start typing your collaborative code here...');
    } else {
      setEditableContent(getFileContent(activeFile));
    }
  }, [activeFile]);

  const handleChange = (e) => {
    const value = e.target.value;
    setEditableContent(value);
    localStorage.setItem(`file_${activeFile}`, value); // temp persistence
  };

  if (!activeFile) {
    return (
      <div className="flex-1 bg-[#1e1e1e] flex items-center justify-center text-gray-400">
        No file selected
      </div>
    );
  }

  // 🧠 Editable area for message.js
  if (isEditable) {
    return (
      <div className="flex-1 bg-[#1e1e1e] py-1">
         <MessageEditor
          initialContent="// Start typing your collaborative code here..."
          onChange={(value) => onContentChange(value)}
        />
      </div>
    );
  }

  // 🧠 Normal display for static files
  const content = getFileContent(activeFile);
  return (
    <div className="flex-1 overflow-auto bg-[#1e1e1e] p-8 font-mono">
      {activeFile.endsWith('.md') ? (
        <div className="max-w-4xl mx-auto prose prose-invert">
          <MarkdownRenderer content={content} />
        </div>
      ) : (
        <SyntaxHighlighter
          language="javascript"
          style={dracula}
          showLineNumbers
          wrapLines
          customStyle={{
            background: 'transparent',
            fontSize: '15px',
            lineHeight: '1',
            padding: '0',
            margin: '0',
          }}
        >
          {content}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

// ✅ File content resolver
const getFileContent = (filename) => {
  if (projects[filename.replace('.md', '')]) {
    return projects[filename.replace('.md', '')];
  }

  const contents = {
    'README.md': readme,
    'about.jsx': about,
    'skills.json': skills,
    'contact.py' : contact,
    'UTKAL-CRAFTS.md':projects.project2,
    'JANA-SAHAYAK.md':projects.project1,
    
  };

  return contents[filename] || '// File content not found';
};

export default CodeEditor;
