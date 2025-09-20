// In: src/App.jsx

import React, { useState, useEffect } from 'react';
import Visualizer from './components/Visualizer';
import CodeEditor from './components/CodeEditor';
import Controls from './components/Controls';
import OperationsPanel from './components/OperationsPanel';
import ProblemPanel from './components/ProblemPanel';
import StatsPanel from './components/StatsPanel';
import { Sun, Moon, Code, Eye, Terminal } from 'lucide-react';
// Correctly fetches problems from the backend, no local import
import { SLLNode, StackNode, BSTNode, getBubbleSortAnimations, getMergeSortAnimations, getSLLInsertAtHeadAnimations, getSLLDeleteByValueAnimations, getStackPushAnimations, getStackPopAnimations, getBSTInsertAnimations, getBSTSearchAnimations } from './lib/algorithms';

// --- Code Snippets for Sandbox Modes (Complete and Unabridged) ---
const linkedListCode = `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function insertAtHead(head, value) {
  const newNode = new Node(value);
  newNode.next = head;
  return newNode;
}

function deleteByValue(head, value) {
  if (!head) return null;
  if (head.value === value) return head.next;
  
  let current = head;
  while (current.next && current.next.value !== value) {
    current = current.next;
  }
  
  if (current.next) {
    current.next = current.next.next;
  }
  return head;
}`;

const stackCode = `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`;

const bstCode = `class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    if (this.root === null) return false;
    let current = this.root;
    while(current) {
        if(value < current.value) {
            current = current.left;
        } else if (value > current.value) {
            current = current.right;
        } else {
            return true;
        }
    }
    return false;
  }
}`;


// --- Main App Component ---
export default function App() {
  // --- STATE MANAGEMENT ---
  const [allProblems, setAllProblems] = useState({ array: [], bst: [], linkedList: [], stack: [] });
  const [dataType, setDataType] = useState('array');
  const [inputValue, setInputValue] = useState('');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userCode, setUserCode] = useState('');
  
  const [array, setArray] = useState([]);
  const [linkedList, setLinkedList] = useState({ nodes: [], head: null });
  const [stack, setStack] = useState({ items: [] });
  const [bst, setBst] = useState({ nodes: {}, root: null });

  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const [visualData, setVisualData] = useState({});
  const [explanation, setExplanation] = useState("Loading challenges...");
  const [currentLine, setCurrentLine] = useState(null);
  const [executionOutput, setExecutionOutput] = useState(null);
  const [executionStats, setExecutionStats] = useState(null);

  const [theme, setTheme] = useState('dark');
  const [resetCameraTrigger, setResetCameraTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('code');

  // --- EFFECT: Fetch problems from backend on initial load ---
  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await fetch('http://localhost:5001/api/problems');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAllProblems(data);
        handleDataTypeChange('array', data);
      } catch (error) {
        console.error("Failed to fetch problems from backend:", error);
        setExplanation("Error: Could not connect to the backend service. Please make sure the backend server is running.");
      }
    }
    fetchProblems();
  }, []);


  // --- HANDLERS ---
  const handleInputChange = (e) => setInputValue(e.target.value);
  
  const handleDataTypeChange = (newType, problemsData = allProblems) => {
    setIsPlaying(false);
    setAnimations([]);
    setCurrentStep(0);
    setDataType(newType);
    setVisualData({});
    setCurrentProblem(null);
    setExecutionOutput(null);
    setExecutionStats(null);
    setActiveTab('code');
    
    if (newType === 'array' || newType === 'bst') {
        const firstProblem = problemsData[newType]?.[0];
        if (firstProblem) {
            handleSelectProblem(firstProblem);
        }
    } else {
        setInputValue('55'); 
        if (newType === 'linkedList') setVisualData({ nodes: linkedList.nodes, head: linkedList.head, highlights: {} });
        if (newType === 'stack') setVisualData({ stack: stack.items, highlights: {} });
    }
  };
  
  const handleSelectProblem = (problem) => {
      setCurrentProblem(problem);
      setAnimations([]);
      setCurrentStep(0);
      setIsPlaying(false);
      setUserCode(problem.defaultCode);
      setExecutionOutput(null);
      setExecutionStats(null);
      setActiveTab('code');
      if (problem.initialData) {
          if (dataType === 'array') {
              setArray(problem.initialData);
              setVisualData({ arrayData: problem.initialData, highlights: {} });
              setInputValue(problem.initialData.join(', '));
          } else if (dataType === 'bst') {
              setBst(problem.initialData);
              setVisualData({ bst: problem.initialData, highlights: {} });
              setInputValue('75');
          }
      }
  };

  const handleRunCode = async () => {
    if (!currentProblem) return;

    setExecutionOutput('Executing code...');
    setExecutionStats(null); // Clear old stats
    setActiveTab('output');
    try {
        const response = await fetch('http://localhost:5001/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userCode: userCode.replace(`function ${currentProblem.defaultCode.split(' ')[1].split('(')[0]}`, 'function main'),
                problemInput: (dataType === 'array') ? inputValue.split(',').map(n => parseInt(n.trim())) : currentProblem.initialData,
            })
        });
        const result = await response.json();
        if (response.ok) {
            setExecutionOutput(`Code executed successfully. Starting visualization...`);
            setAnimations(result.animationSteps || []);
            setIsPlaying(true);
            setCurrentStep(0);
        } else {
            setExecutionOutput(`Execution Error:\n${result.error}`);
        }
    } catch (error) {
        setExecutionOutput(`Network Error: Failed to connect to execution service.`);
    }
  };

  const handleOperation = (operation) => {
    setExecutionStats(null);
    let anims = [];
    if (dataType === 'bst') {
      const value = parseInt(inputValue.trim());
      if (isNaN(value)) { alert("Please enter a valid number."); return; }
      if (operation === 'insert') anims = getBSTInsertAnimations(bst, value);
      else if (operation === 'search') anims = getBSTSearchAnimations(bst, value);
    } else if (dataType === 'linkedList') {
      const value = parseInt(inputValue.trim());
      if (isNaN(value)) { alert("Please enter a valid number."); return; }
      if (operation === 'insertAtHead') anims = getSLLInsertAtHeadAnimations(linkedList.head, value);
      else if (operation === 'deleteByValue') anims = getSLLDeleteByValueAnimations(linkedList.nodes, linkedList.head, value);
    } else if (dataType === 'stack') {
      if (operation === 'push') {
        const value = parseInt(inputValue.trim());
        if (isNaN(value)) { alert("Please enter a valid number."); return; }
        anims = getStackPushAnimations(value);
      } else if (operation === 'pop') {
        anims = getStackPopAnimations(stack.items);
      }
    }
    setAnimations(anims);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const handleExplain = async () => {
    const codeToExplain = userCode || (currentProblem ? currentProblem.defaultCode : '');
    if (!codeToExplain) {
        setExplanation("There is no code to explain.");
        setActiveTab('explanation');
        return;
    };
    setExplanation("🤖 Generating explanation with Groq...");
    setActiveTab('explanation');
    try {
        const response = await fetch('http://localhost:5001/api/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: codeToExplain }) // SEND THE CURRENT USER'S CODE
        });
        const result = await response.json();
        if (response.ok) {
            setExplanation(result.explanation);
        } else {
            setExplanation(`Error generating explanation: ${result.error}`);
        }
    } catch (error) {
        setExplanation("Network Error: Failed to connect to explanation service.");
    }
  };
  
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleStepForward = () => { if (currentStep < animations.length) setCurrentStep(currentStep + 1); };
  const handleStepBackward = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };
  const handleSpeedChange = (newSpeed) => setSpeed(newSpeed);
  
  const handleClear = () => {
    setIsPlaying(false);
    setAnimations([]);
    setCurrentStep(0);
    setVisualData({});
    setExecutionStats(null);
    if (dataType === 'linkedList') setLinkedList({ nodes: [], head: null });
    if (dataType === 'stack') setStack({ items: [] });
    if (dataType === 'bst') setBst({ nodes: {}, root: null });
  };

  const handleResetCamera = () => {
    setResetCameraTrigger(c => c + 1);
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // --- EFFECT: Theme Manager ---
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);
  
  // --- EFFECT: Main Animation Processor ---
  useEffect(() => {
    if (animations.length === 0) return;
    if (currentStep >= animations.length) {
        if (isPlaying) setIsPlaying(false);
        const lastStep = animations[animations.length - 1];
        setExplanation(lastStep.explanation || "Animation complete!");
        
        const newStats = {};
        if (dataType === 'array') {
            newStats.comparisons = animations.filter(a => a.type === 'compare').length;
            newStats.swaps = animations.filter(a => a.type === 'swap').length;
            newStats.overwrites = animations.filter(a => a.type === 'overwrite').length;
            const finalSortedArray = [...array].sort((a, b) => a - b);
            setVisualData({ arrayData: finalSortedArray, highlights: {} });
        }
        setExecutionStats(newStats);
        
        return;
    }
    const step = animations[currentStep];
    setExplanation(step.explanation);
    setCurrentLine(step.line || null);
    if (dataType === 'array') {
      const visArray = [...array];
      const highlights = { compare: [], swap: [], overwrite: [], lift: [] };
      for (let i = 0; i < currentStep; i++) {
          const s = animations[i];
          if (s.type === 'swap') { [visArray[s.indices[0]], visArray[s.indices[1]]] = [s.values[0], s.values[1]]; }
          else if (s.type === 'overwrite') { visArray[s.index] = s.value; }
      }
      const currentAnim = step, prevAnim = currentStep > 0 ? animations[currentStep - 1] : null;
      if (currentAnim.type === 'compare') { highlights.compare = currentAnim.indices; highlights.lift = currentAnim.indices; }
      else if (currentAnim.type === 'swap') {
          highlights.swap = currentAnim.indices;
          if (prevAnim && prevAnim.type === 'compare' && prevAnim.indices.every(val => currentAnim.indices.includes(val))) {
              highlights.lift = currentAnim.indices;
          }
      }
      else if (currentAnim.type === 'overwrite') { highlights.overwrite = [currentAnim.index]; highlights.lift = [currentAnim.index]; }
      setVisualData({ arrayData: visArray, highlights });
    } else if (dataType === 'linkedList') {
        let currentNodes = visualData.nodes || linkedList.nodes;
        let currentHead = visualData.head !== undefined ? visualData.head : linkedList.head;
        let newHighlights = {};
        if (step.type === 'create') {
            const newNode = new SLLNode(step.nodeId, step.value);
            currentNodes = [...currentNodes, newNode];
            newHighlights = { create: [step.nodeId] };
        } else if (step.type === 'set-next') {
            currentNodes = currentNodes.map(n => n.id === step.sourceId ? { ...n, next: step.targetId } : n);
        } else if (step.type === 'update-head') {
            currentHead = step.newHeadId;
        } else if (step.type === 'traverse') {
            newHighlights = { traverse: [step.currId], prev: step.prevId ? [step.prevId] : [] };
        } else if (step.type === 'found') {
            newHighlights = { found: [step.nodeId] };
        } else if (step.type === 'relink') {
            currentNodes = currentNodes.map(n => n.id === step.prevId ? { ...n, next: step.nextId } : n);
        } else if (step.type === 'delete') {
            newHighlights = { delete: [step.nodeId] };
            setTimeout(() => {
                setVisualData(prev => ({ ...prev, nodes: prev.nodes.filter(n => n.id !== step.nodeId) }));
            }, 500 / speed);
        } else if (step.type === 'finish') {
            const finalNodes = currentNodes.filter(n => !newHighlights.delete?.includes(n.id));
            setLinkedList({ nodes: finalNodes, head: currentHead });
            newHighlights = {};
        }
        setVisualData({ nodes: currentNodes, head: currentHead, highlights: newHighlights });
    } else if (dataType === 'stack') {
        let currentStack = visualData.stack || stack.items;
        let newHighlights = {};
        if (step.type === 'create') {
            const newNode = new StackNode(step.nodeId, step.value);
            currentStack = [...currentStack, newNode];
            newHighlights = { create: [step.nodeId] };
        } else if (step.type === 'move-to-stack') {
            newHighlights = { moveToStack: [step.nodeId], create: [step.nodeId] };
        } else if (step.type === 'highlight-pop') {
            newHighlights = { pop: [step.nodeId] };
        } else if (step.type === 'delete') {
            newHighlights = { delete: [step.nodeId] };
             setTimeout(() => {
                setVisualData(prev => ({ ...prev, stack: prev.stack.filter(n => n.id !== step.nodeId) }));
            }, 500 / speed);
        } else if (step.type === 'finish') {
            const finalStack = currentStack.filter(n => !newHighlights.delete?.includes(n.id));
            setStack({ items: finalStack });
            newHighlights = {};
        }
        setVisualData({ stack: currentStack, highlights: newHighlights });
    } else if (dataType === 'bst') {
        let currentBst = visualData.bst || bst;
        let newHighlights = {};
        if (step.type === 'create') {
            const newNode = new BSTNode(step.nodeId, step.value);
            const newNodes = { ...currentBst.nodes, [step.nodeId]: newNode };
            currentBst = { ...currentBst, nodes: newNodes };
            newHighlights = { create: { nodeId: step.nodeId } };
        } else if (step.type === 'set-root') {
            currentBst = { ...currentBst, root: step.nodeId };
        } else if (step.type === 'traverse') {
            newHighlights = { traverse: [step.nodeId] };
        } else if (step.type === 'compare') {
            newHighlights = { traverse: [step.nodeId] };
        } else if (step.type === 'relink') {
            const { parentId, childId, direction } = step;
            const parentNode = { ...currentBst.nodes[parentId], [direction]: childId };
            const childNode = { ...currentBst.nodes[childId], parentId: parentId };
            const newNodes = { ...currentBst.nodes, [parentId]: parentNode, [childId]: childNode };
            currentBst = { ...currentBst, nodes: newNodes };
        } else if (step.type === 'found') {
            newHighlights = { found: [step.nodeId] };
        } else if (step.type === 'finish') {
            setBst(currentBst);
            newHighlights = {};
        }
        setVisualData({ bst: currentBst, highlights: newHighlights });
    }
  }, [currentStep, animations]);

  // EFFECT: Animation Player
  useEffect(() => {
    if (isPlaying && currentStep < animations.length) {
      const timeout = setTimeout(() => setCurrentStep(currentStep + 1), 500 / speed);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, currentStep, animations, speed]);
  
  // --- RENDER ---
  return (
    <div className={`bg-primary-100 dark:bg-primary-950 text-primary-800 dark:text-primary-200 min-h-screen font-sans flex flex-col`}>
      <header className="bg-white/80 dark:bg-primary-900/80 backdrop-blur-sm border-b border-primary-200 dark:border-primary-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">3D Code Visualizer</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary-200 dark:bg-primary-800 p-1 rounded-lg">
                <button onClick={() => handleDataTypeChange('array')} className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'array' ? 'bg-secondary-600 text-white' : 'text-primary-600 dark:text-primary-300'}`}>Array</button>
                <button onClick={() => handleDataTypeChange('linkedList')} className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'linkedList' ? 'bg-secondary-600 text-white' : 'text-primary-600 dark:text-primary-300'}`}>Linked List</button>
                <button onClick={() => handleDataTypeChange('stack')} className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'stack' ? 'bg-secondary-600 text-white' : 'text-primary-600 dark:text-primary-300'}`}>Stack</button>
                <button onClick={() => handleDataTypeChange('bst')} className={`px-3 py-1 rounded-md text-sm font-medium ${dataType === 'bst' ? 'bg-secondary-600 text-white' : 'text-primary-600 dark:text-primary-300'}`}>BST</button>
            </div>
            <button onClick={handleThemeToggle} className="p-2 rounded-full text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-700">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow" style={{maxHeight: 'calc(100vh - 4rem)'}}>
        <div className="flex flex-col gap-4 h-full">
           <div className="flex-grow min-h-0">
               <ProblemPanel 
                    problems={allProblems[dataType]} 
                    onSelectProblem={handleSelectProblem}
                    selectedProblemId={currentProblem?.id}
                />
           </div>
            <div className="flex-shrink-0">
                <OperationsPanel
                    dataType={dataType}
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    onOperation={handleOperation}
                    onPrimaryAction={handleRunCode}
                    onClear={handleClear}
                    currentProblem={currentProblem}
                    onExplain={handleExplain}
                />
            </div>
             <div className="flex-shrink-0">
                <StatsPanel stats={executionStats} />
            </div>
        </div>
        <div className="h-full flex flex-col gap-4">
            <div className="flex-grow min-h-0">
               <Visualizer 
                  dataType={dataType} 
                  visualData={visualData}
                  resetCameraTrigger={resetCameraTrigger}
                />
            </div>
            <div className="flex-shrink-0 h-24">
              <Controls 
                  onPlayPause={handlePlayPause} 
                  onStepForward={handleStepForward} 
                  onStepBackward={handleStepBackward} 
                  onSpeedChange={handleSpeedChange} 
                  isPlaying={isPlaying}
                  onResetCamera={handleResetCamera}
              />
            </div>
            <div className="flex-grow flex flex-col min-h-0 bg-white dark:bg-primary-900 rounded-lg shadow-lg border border-primary-200 dark:border-primary-700">
                <div className="flex-shrink-0 flex items-center border-b border-primary-200 dark:border-primary-700">
                    <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 p-3 font-medium ${activeTab === 'code' ? 'text-secondary-500 border-b-2 border-secondary-500' : 'text-primary-500 dark:text-primary-400'}`}>
                        <Code size={16}/> Code
                    </button>
                    <button onClick={() => setActiveTab('explanation')} className={`flex items-center gap-2 p-3 font-medium ${activeTab === 'explanation' ? 'text-secondary-500 border-b-2 border-secondary-500' : 'text-primary-500 dark:text-primary-400'}`}>
                        <Eye size={16}/> Explanation
                    </button>
                    <button onClick={() => setActiveTab('output')} className={`flex items-center gap-2 p-3 font-medium ${activeTab === 'output' ? 'text-secondary-500 border-b-2 border-secondary-500' : 'text-primary-500 dark:text-primary-400'}`}>
                        <Terminal size={16}/> Output
                    </button>
                </div>
                <div className="flex-grow min-h-0 p-1">
                    {activeTab === 'code' && (
                        <CodeEditor 
                            key={currentProblem?.id || dataType} 
                            code={userCode || getCodeForSandbox(dataType)} 
                            onCodeChange={setUserCode}
                            currentLine={currentLine} 
                            theme={theme}
                            readOnly={!currentProblem}
                        />
                    )}
                    {activeTab === 'explanation' && (
                        <div className="text-sm h-full overflow-y-auto p-4">
                            <p>{explanation}</p>
                        </div>
                    )}
                    {activeTab === 'output' && (
                        <div className="text-sm h-full overflow-y-auto p-4 font-mono whitespace-pre-wrap">
                            {executionOutput || "Click 'Run Code' to see the output from the backend."}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

// Helper function to get the correct code for sandbox modes
function getCodeForSandbox(dataType) {
    switch(dataType) {
        case 'linkedList': return linkedListCode;
        case 'stack': return stackCode;
        case 'bst': return bstCode;
        default: return '';
    }
}