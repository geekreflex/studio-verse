import { useEditorContext } from '@/context/EditorContext';
import { useEffect } from 'react';
import { styled } from 'styled-components';

export default function DrawingTool() {
  const { draw } = useEditorContext();

  useEffect(() => {
    draw?.start();
  }, []);

  const handleBrush = (brush: string) => {
    draw?.changeBrush(brush);
  };

  return (
    <Wrap>
      <div>
        <button onClick={() => handleBrush('vline')}>v line</button>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div``;
