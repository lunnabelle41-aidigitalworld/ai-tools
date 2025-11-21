import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCopy, FiCheck, FiPlay, FiCode } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Dynamically import Monaco Editor with no SSR
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

interface CodePlaygroundProps {
  code?: string;
  language?: string;
  height?: string | number;
  className?: string;
  showLineNumbers?: boolean;
  theme?: 'light' | 'vs-dark' | 'hc-black';
  readOnly?: boolean;
  showRunButton?: boolean;
  showCopyButton?: boolean;
  defaultTab?: 'code' | 'preview';
  tabs?: Array<{ name: string; language: string; code: string }>;
  onCodeChange?: (code: string) => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  code: initialCode = '// Write your code here\nconsole.log("Hello, world!");',
  language = 'javascript',
  height = '400px',
  className = '',
  showLineNumbers = true,
  theme = 'vs-dark',
  readOnly = false,
  showRunButton = true,
  showCopyButton = true,
  defaultTab = 'code',
  tabs = [],
  onCodeChange,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeLanguage, setActiveLanguage] = useState(language);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle code execution in a safe manner
  const executeCode = () => {
    try {
      // Create a sandboxed iframe to run the code
      const iframe = iframeRef.current;
      if (!iframe) return;

      const iframeDoc = iframe.contentDocument || (iframe.contentWindow as any)?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: monospace; padding: 1rem; margin: 0; }
                .error { color: #ff6b6b; }
              </style>
            </head>
            <body>
              <div id="output"></div>
              <script>
                const originalLog = console.log;
                const outputDiv = document.getElementById('output');
                
                // Override console methods to capture output
                console.log = function(...args) {
                  outputDiv.innerHTML += args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                  ).join(' ') + '<br>';
                  originalLog.apply(console, args);
                };
                
                // Error handling
                window.onerror = function(message, source, lineno, colno, error) {
                  const errorDiv = document.createElement('div');
                  errorDiv.className = 'error';
                  errorDiv.textContent = \`Error: \${message} (line \${lineno}:\${colno})\n\${error ? error.stack : ''}\`;
                  outputDiv.appendChild(errorDiv);
                  return true;
                };
                
                // Execute the code
                try {
                  ${code}\n//# sourceURL=code-playground.js
                } catch (e) {
                  console.error(e);
                }
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // Handle code copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    if (tabs[index]) {
      setActiveLanguage(tabs[index].language);
      setCode(tabs[index].code);
    }
  };

  // Effect to handle initial code and language
  useEffect(() => {
    if (tabs.length > 0) {
      setCode(tabs[activeTabIndex].code);
      setActiveLanguage(tabs[activeTabIndex].language);
    }
  }, [activeTabIndex, tabs]);

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-700 ${className}`}>
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex bg-gray-800 border-b border-gray-700">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium ${
                activeTabIndex === index
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {/* Editor/Preview Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-800">
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
            activeTab === 'code' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <FiCode className="w-4 h-4" />
          Code
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
            activeTab === 'preview' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          <FiPlay className="w-4 h-4" />
          Preview
        </button>
      </div>

      <div className="relative" style={{ height }}>
        <AnimatePresence mode="wait">
          {activeTab === 'code' ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                {showRunButton && (
                  <button
                    onClick={executeCode}
                    className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1"
                    title="Run code"
                  >
                    <FiPlay className="w-3 h-3" />
                    <span>Run</span>
                  </button>
                )}
                {showCopyButton && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs flex items-center gap-1"
                    title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {isCopied ? (
                      <FiCheck className="w-3 h-3 text-green-400" />
                    ) : (
                      <FiCopy className="w-3 h-3" />
                    )}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <MonacoEditor
                height={height}
                language={activeLanguage}
                theme={theme}
                value={code}
                onChange={(value) => {
                  setCode(value || '');
                  if (onCodeChange) onCodeChange(value || '');
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  readOnly,
                  lineNumbers: showLineNumbers ? 'on' : 'off',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-white"
            >
              <iframe
                ref={iframeRef}
                title="Code Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CodePlayground;
