// src/components/InteractiveTerminal.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../assets/styles/InteractiveTerminal.css';

interface TerminalLine {
  type: 'command' | 'output' | 'input';
  content: string;
  delay?: number;
}

interface CommandSequence {
  name: string;
  lines: TerminalLine[];
}

const InteractiveTerminal: React.FC = () => {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isInteractive, setIsInteractive] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command sequences that will cycle through
  const sequences: CommandSequence[] = useMemo(() => [
    {
      name: 'project-setup',
      lines: [
        { type: 'command', content: 'cd ~/projects/reroute', delay: 1000 },
        { type: 'command', content: 'git status', delay: 800 },
        { type: 'output', content: 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nChanges not staged for commit:\n  modified:   backend/app/services/ai_agent.py\n  modified:   frontend/src/components/TrainingPlan.tsx', delay: 1200 },
        { type: 'command', content: 'npm run dev', delay: 1000 },
        { type: 'output', content: '🚀 Starting development servers...\n📦 Frontend: http://localhost:5173\n🔧 Backend: http://localhost:8002\n✨ Ready for development!', delay: 1500 }
      ]
    },
    {
      name: 'deployment',
      lines: [
        { type: 'command', content: 'git add .', delay: 800 },
        { type: 'command', content: 'git commit -m "Add AI agent improvements for training plans"', delay: 1000 },
        { type: 'output', content: '[main 4a8f9c2] Add AI agent improvements for training plans\n 2 files changed, 47 insertions(+), 12 deletions(-)', delay: 1200 },
        { type: 'command', content: 'git push origin main', delay: 800 },
        { type: 'output', content: 'Enumerating objects: 8, done.\nCounting objects: 100% (8/8), done.\nCompressing objects: 100% (4/4), done.\nWriting objects: 100% (4/4), 1.2 KiB | 1.2 MiB/s, done.\nTotal 4 (delta 2), reused 0 (delta 0)', delay: 1500 },
        { type: 'command', content: 'gcloud run deploy --source .', delay: 1000 },
        { type: 'output', content: '🚀 Deploying to Google Cloud Run...\n✅ Deployment successful!\n🌐 Service URL: https://reroute-app-828281382646.us-central1.run.app', delay: 2000 }
      ]
    },
    {
      name: 'healthcare-work',
      lines: [
        { type: 'command', content: 'cd ~/work/keck-medicine', delay: 1000 },
        { type: 'command', content: 'npm run test:unit', delay: 800 },
        { type: 'output', content: '📋 Running patient scheduling tests...\n✅ Authentication flow: 12 passed\n✅ Cerner API integration: 8 passed\n✅ Admin portal components: 15 passed\n\n🎉 All tests passed!', delay: 1800 },
        { type: 'command', content: 'npm run build:prod', delay: 1000 },
        { type: 'output', content: '🏗️  Building healthcare application...\n📦 Optimizing React components...\n🔒 Security audit passed\n✅ Build complete: 2.1MB', delay: 2000 }
      ]
    },
    {
      name: 'skills-demo',
      lines: [
        { type: 'command', content: 'echo "Tech Stack Overview"', delay: 800 },
        { type: 'output', content: 'Tech Stack Overview', delay: 500 },
        { type: 'command', content: 'ls -la ~/skills/', delay: 800 },
        { type: 'output', content: 'Frontend: React, TypeScript, Next.js, Tailwind\nBackend: Python, FastAPI, Node.js, C++\nDatabases: PostgreSQL, MySQL, Redis\nCloud: Google Cloud Run, AWS\nAPIs: OpenAI GPT-4, Strava, Cerner, Stripe', delay: 1500 },
        { type: 'command', content: 'whoami', delay: 600 },
        { type: 'output', content: 'Software Engineer • USC Graduate Student • Problem Solver', delay: 800 }
      ]
    }
  ], []);

  // Available interactive commands
  const interactiveCommands: Record<string, string> = {
    'help': 'Available commands:\n• about - Learn about me\n• projects - View my projects\n• skills - See my technical skills\n• contact - Get in touch\n• clear - Clear terminal',
    'about': 'Hi! I\'m Darragh Mahns, a Software Engineer and Computer Science graduate student at USC.\nCurrently working at Keck Medicine developing healthcare applications.\nPassionate about AI, full-stack development, and solving real-world problems.',
    'projects': '🚴 Reroute - AI-powered cycling training platform\n🏥 Healthcare Admin Portal - Patient scheduling system\n🏊 Swimmingly - Heat sheet generator\n🏃 BUILD Sports - Performance tracking website\n\nVisit /projects to see more details!',
    'skills': '💻 Languages: TypeScript, Python, JavaScript, C++\n⚛️  Frontend: React, Next.js, Tailwind CSS, Mantine\n🔧 Backend: FastAPI, Node.js, Express\n🗄️  Databases: PostgreSQL, MySQL, Redis\n☁️  Cloud: Google Cloud Run, AWS\n🤖 AI/ML: OpenAI GPT-4, TensorFlow',
    'contact': '📧 Email: darraghmahns at gmail dot com\n💼 LinkedIn: linkedin.com/in/darraghmahns\n🐱 GitHub: github.com/darraghmahns\n\nOr use the contact form at /contact',
    'clear': 'CLEAR_TERMINAL',
    'whoami': 'darraghmahns at gmail dot com',
    'pwd': '/Users/darragh/portfolio',
    'ls': 'projects/  experience/  blog/  contact/',
    'date': new Date().toLocaleString(),
  };

  // Typing animation effect
  useEffect(() => {
    const sequence = sequences[currentSequence];
    if (!sequence || currentLine >= sequence.lines.length) {
      // Switch to interactive mode or next sequence
      const timer = setTimeout(() => {
        if (isInteractive) {
          return; // Stay in interactive mode
        }
        setCurrentSequence((prev) => (prev + 1) % sequences.length);
        setCurrentLine(0);
        setDisplayedLines([]);
        setDisplayedText('');
      }, 3000);
      return () => clearTimeout(timer);
    }

    const line = sequence.lines[currentLine];
    const delay = line.delay || 1000;

    const timer = setTimeout(() => {
      setIsTyping(true);
      let charIndex = 0;
      const typeText = () => {
        if (charIndex < line.content.length) {
          setDisplayedText(line.content.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, Math.random() * 50 + 30); // Realistic typing speed
        } else {
          setIsTyping(false);
          setDisplayedLines(prev => [...prev, line]);
          setDisplayedText('');
          setCurrentLine(prev => prev + 1);
        }
      };
      typeText();
    }, delay);

    return () => clearTimeout(timer);
  }, [currentSequence, currentLine, isInteractive, sequences]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Handle user input
  const handleUserInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = userInput.trim().toLowerCase();
      const output = interactiveCommands[command] || `Command not found: ${command}\nType 'help' for available commands.`;
      
      // Add user command to display
      const newLines: TerminalLine[] = [
        { type: 'input', content: `$ ${userInput}` }
      ];
      
      if (output !== 'CLEAR_TERMINAL') {
        newLines.push({ type: 'output', content: output });
      }
      
      setDisplayedLines(prev => [...prev, ...newLines]);

      if (output === 'CLEAR_TERMINAL') {
        setDisplayedLines([]);
      }

      setUserInput('');
    }
  };

  const enterInteractiveMode = () => {
    setIsInteractive(true);
    setDisplayedLines(prev => [
      ...prev,
      { type: 'output', content: '🎯 Interactive mode activated! Type "help" for commands.' }
    ]);
  };

  const exitInteractiveMode = () => {
    setIsInteractive(false);
    setDisplayedLines([]);
    setCurrentSequence((prev) => (prev + 1) % sequences.length);
    setCurrentLine(0);
  };

  return (
    <div className="interactive-terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="control-button close"></div>
          <div className="control-button minimize"></div>
          <div className="control-button maximize"></div>
        </div>
        <div className="terminal-title">darragh@portfolio:~</div>
        <div className="terminal-actions">
          {!isInteractive ? (
            <button className="action-button" onClick={enterInteractiveMode}>
              Try Interactive Mode
            </button>
          ) : (
            <button className="action-button" onClick={exitInteractiveMode}>
              Watch Demo
            </button>
          )}
        </div>
      </div>

      <div className="terminal-body">
        {displayedLines.map((line, index) => (
          <div key={index} className={`terminal-line ${line.type}`}>
            {line.type === 'command' && <span className="prompt">$ </span>}
            {line.type === 'input' && <span className="prompt"></span>}
            <span className="line-content">{line.content}</span>
          </div>
        ))}
        
        {!isInteractive && isTyping && (
          <div className="terminal-line command">
            <span className="prompt">$ </span>
            <span className="line-content">
              {displayedText}
              {showCursor && <span className="cursor">|</span>}
            </span>
          </div>
        )}

        {isInteractive && (
          <div className="terminal-line input">
            <span className="prompt">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleUserInput}
              className="terminal-input"
              placeholder="Type a command..."
              autoFocus
            />
            {showCursor && <span className="cursor">|</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTerminal;