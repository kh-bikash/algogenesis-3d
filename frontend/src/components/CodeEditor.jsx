// In: src/components/CodeEditor.jsx
import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, currentLine, theme, readOnly = true, onCodeChange }) => {
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    if (editorRef.current && currentLine) {
      const editor = editorRef.current;
      const monaco = window.monaco;

      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: new monaco.Range(currentLine, 1, currentLine, 1),
            options: {
              isWholeLine: true,
              className: 'line-highlight',
            },
          },
        ]
      );
    } else if (editorRef.current) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  }, [currentLine]);

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  return (
    <div className="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden relative ring-1 ring-primary-200 dark:ring-primary-700">
      <Editor
        height="100%"
        language="javascript"
        theme={editorTheme}
        value={code}
        onMount={handleEditorDidMount}
        onChange={onCodeChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;