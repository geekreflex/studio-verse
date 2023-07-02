import { styled } from 'styled-components';
import { useEditorContext } from '@/context/EditorContext';
import { useEffect, useState } from 'react';
import Tooltip from './common/Tooltip';
import { RedoIcon, UndoIcon } from '@/icons';

export default function History() {
  const { editor } = useEditorContext();

  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  useEffect(() => {
    if (editor) {
      editor.canvas.on('object:added', runCan);
      editor.canvas.on('object:modified', runCan);
      editor.canvas.on('object:removed', runCan);
      editor.canvas.on('history:clear', runCan);
    }
  }, [editor]);

  const runCan = () => {
    const undoVal = editor?.canvas.historyUndo;
    const redoVal = editor?.canvas.historyRedo;
    if (undoVal) {
      const undoLength = undoVal.length > 1;
      setCanUndo(undoLength);
    }

    if (redoVal) {
      const redoLength = redoVal.length > 0;
      setCanRedo(redoLength);
    }
  };

  const onUndo = () => {
    if (!canUndo) {
      return;
    }
    editor?.canvas.undo();
    editor?.resetWorkspace();
  };
  const onRedo = () => {
    if (!canRedo) {
      return;
    }
    editor?.canvas.redo();
    editor?.resetWorkspace();
  };

  return (
    <Wrap>
      <div className="redo-undo">
        <div className={`icon-wrap ${!canUndo && 'disabled'}`}>
          <Tooltip content="Undo">
            <button className="icon-wrap iconn stroke2" onClick={onUndo}>
              <UndoIcon />
            </button>
          </Tooltip>
        </div>
        <div className={`icon-wrap ${!canRedo && 'disabled'}`}>
          <Tooltip content="Redo" placement="top">
            <button className="icon-wrap iconn stroke2" onClick={onRedo}>
              <RedoIcon />
            </button>
          </Tooltip>
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .redo-undo {
    display: flex;
    gap: 5px;
  }

  .icon-wrap {
    display: flex;
  }

  .disabled {
    cursor: not-allowed;

    .icon-wrap {
      opacity: 0.2;
    }

    * {
      cursor: not-allowed;
      &:hover {
        background-color: transparent;
      }
    }
  }
`;
