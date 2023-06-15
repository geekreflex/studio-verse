import { Controller } from '@/core/Controller';
import { Editor } from '@/core/Editor';
import { Tool } from '@/core/Tool';
import { createContext, useCallback, useContext, useState } from 'react';

type EditorContextType = {
  tool: Tool | null;
  controller: Controller | null;
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

const EditorContext = createContext<EditorContextType>({
  tool: null,
  controller: null,
  editor: null,
  setEditor: () => {},
});

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [editor, _setEditor] = useState<Editor | null>(null);
  const [tool, setTool] = useState<Tool | null>(null);
  const [controller, setController] = useState<Controller | null>(null);

  const setEditor = useCallback((editor: Editor | null) => {
    _setEditor(editor);
    if (editor) {
      setTool(new Tool(editor));
      setController(new Controller(editor));
    }
  }, []);

  const contextValues = {
    tool,
    editor,
    controller,
    setEditor,
  };

  return (
    <EditorContext.Provider value={contextValues}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);
