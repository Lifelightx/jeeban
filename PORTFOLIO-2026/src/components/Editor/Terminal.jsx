// components/Editor/Terminal.jsx
import { useState } from 'react';

const Terminal = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commands] = useState([
    { command: 'npm start', output: 'Portfolio running on http://localhost:3000' },
    { command: 'git status', output: 'On branch main\nYour branch is up to date' }
  ]);

  return (
    <div className={`bg-[#1e1e1e] border-t border-[#3e3e42] transition-all ${isExpanded ? 'h-64' : 'h-12'}`}>
      <div 
        className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm">TERMINAL</span>
        <span className="text-xs text-green-500">{isExpanded ? '−' : '+'}</span>
      </div>
      
      {isExpanded && (
        <div className="p-1 font-mono text-sm overflow-auto h-[80%]">
          {commands.map((cmd, index) => (
            <div key={index} className="mb-2">
              <div className="text-green-400">$ {cmd.command}</div>
              <div className="text-gray-400 ml-2">{cmd.output}</div>
            </div>
          ))}
          <div className="flex items-center text-green-400">
            <span>$ </span>
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;