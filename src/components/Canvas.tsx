import { useEffect } from 'react';
import { styled } from 'styled-components';
import { Editor } from '@/core';
import { fabric } from 'fabric';
import 'fabric-history';

import { useEditorContext } from '@/context/EditorContext';

export default function Canvas() {
  const { setEditor } = useEditorContext();

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas('canvas', {
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,
    });

    const workspaceEl = document.getElementById('workspace');
    const option = { width: 1200, height: 1200 };

    const editor = new Editor(fabricCanvas, workspaceEl!, option);
    setEditor(editor);

    // fabric.Object.prototype.set({
    //   originX: 'center',
    //   originY: 'center',
    // });

    return () => {
      editor.dispose();
      setEditor(null);
    };
  }, []);

  return (
    <Wrap>
      <div id="workspace">
        <canvas id="canvas" />
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100%;
  height: 100%;

  #workspace {
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.colors.sceneBg};
    overflow: auto;
  }
`;
