// components/Markdown/MarkdownRenderer.jsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  FaExternalLinkAlt, 
  FaInfoCircle, 
  FaCheckCircle,
  FaTimesCircle 
} from 'react-icons/fa';

const MarkdownRenderer = ({ content, className = '' }) => {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // GitHub Flavored Markdown
        rehypePlugins={[rehypeRaw]} // Allow HTML in markdown
        components={{
          // Custom heading renderer with anchor links
          h1: ({ node, children, ...props }) => (
            <h1 
              className="text-4xl font-bold text-white mb-6 pb-3 border-b border-gray-700 flex items-center gap-3"
              {...props}
            >
              {children}
            </h1>
          ),
          
          h2: ({ node, children, ...props }) => (
            <h2 
              className="text-3xl font-semibold text-white mt-8 mb-4 flex items-center gap-2"
              {...props}
            >
              <span className="text-blue-400">#</span>
              {children}
            </h2>
          ),
          
          h3: ({ node, children, ...props }) => (
            <h3 
              className="text-2xl font-semibold text-gray-200 mt-6 mb-3"
              {...props}
            >
              {children}
            </h3>
          ),

          // Paragraph styling
          p: ({ node, children, ...props }) => (
            <p 
              className="text-gray-300 leading-relaxed mb-4 text-base"
              {...props}
            >
              {children}
            </p>
          ),

          // Links with external icon
          a: ({ node, children, href, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300 transition-colors inline-flex items-center gap-1"
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : ''}
                {...props}
              >
                {children}
                {isExternal && <FaExternalLinkAlt className="text-xs" />}
              </a>
            );
          },

          // Code blocks with syntax highlighting
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            return !inline && match ? (
              <div className="my-4 rounded-lg overflow-hidden">
                {/* Code block header */}
                <div className="bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 flex items-center justify-between border-b border-gray-700">
                  <span>{language}</span>
                  <button 
                    className="hover:text-white transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(String(children));
                    }}
                  >
                    Copy
                  </button>
                </div>
                
                {/* Syntax highlighted code */}
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  className="!bg-[#1e1e1e] !m-0"
                  showLineNumbers={true}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code 
                className="bg-[#2d2d2d] text-[#ce9178] px-2 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Lists
          ul: ({ node, children, ...props }) => (
            <ul 
              className="list-disc list-inside mb-4 space-y-2 text-gray-300"
              {...props}
            >
              {children}
            </ul>
          ),

          ol: ({ node, children, ...props }) => (
            <ol 
              className="list-decimal list-inside mb-4 space-y-2 text-gray-300"
              {...props}
            >
              {children}
            </ol>
          ),

          li: ({ node, children, ...props }) => (
            <li 
              className="ml-4 leading-relaxed"
              {...props}
            >
              {children}
            </li>
          ),

          // Blockquotes
          blockquote: ({ node, children, ...props }) => (
            <blockquote 
              className="border-l-4 border-blue-500 bg-blue-500/10 pl-4 py-3 my-4 italic text-gray-300"
              {...props}
            >
              <FaInfoCircle className="inline mr-2 text-blue-400" />
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ node, children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table 
                className="min-w-full border border-gray-700 rounded-lg overflow-hidden"
                {...props}
              >
                {children}
              </table>
            </div>
          ),

          thead: ({ node, children, ...props }) => (
            <thead 
              className="bg-[#2d2d2d] text-gray-200"
              {...props}
            >
              {children}
            </thead>
          ),

          tbody: ({ node, children, ...props }) => (
            <tbody 
              className="divide-y divide-gray-700"
              {...props}
            >
              {children}
            </tbody>
          ),

          tr: ({ node, children, ...props }) => (
            <tr 
              className="hover:bg-[#2d2d2d]/50 transition-colors"
              {...props}
            >
              {children}
            </tr>
          ),

          th: ({ node, children, ...props }) => (
            <th 
              className="px-6 py-3 text-left text-sm font-semibold"
              {...props}
            >
              {children}
            </th>
          ),

          td: ({ node, children, ...props }) => (
            <td 
              className="px-6 py-4 text-sm text-gray-300"
              {...props}
            >
              {children}
            </td>
          ),

          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr 
              className="my-8 border-gray-700"
              {...props}
            />
          ),

          // Images
          img: ({ node, src, alt, ...props }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg my-6 max-w-full h-auto shadow-lg"
              loading="lazy"
              {...props}
            />
          ),

          // Task lists (GitHub-style checkboxes)
          input: ({ node, ...props }) => (
            <input
              className="mr-2 accent-green-500"
              disabled
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;