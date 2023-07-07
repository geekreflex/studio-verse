import { styled } from 'styled-components';
import NumberInput from './common/NumberInput';
import Range from './common/Range';
import { useEditorContext } from '@/context/EditorContext';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setObject } from '@/features/editorSlice';
import { fabric } from 'fabric';

export default function CornerRound() {
  const dispatch = useAppDispatch();
  const { object } = useAppSelector((state) => state.editor);
  const { editor } = useEditorContext();

  const handleRoundCorner = (val: number) => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject() as fabric.Rect;
      dispatch(setObject({ rx: val, ry: val }));
      activeObject?.set({ rx: val, ry: val });
      editor.canvas.renderAll();
    }
  };

  return (
    <Wrap>
      <div>
        <div className="input-number-range-wrap">
          <h4>Corner Rounding</h4>
          <div className="number-wrap">
            <NumberInput
              value={(object as fabric.Rect).rx || 0}
              onChange={handleRoundCorner}
            />
          </div>
        </div>
        <Range
          min={0}
          max={100}
          step={1}
          value={(object as fabric.Rect)?.rx || 0}
          onChange={handleRoundCorner}
        />
      </div>
    </Wrap>
  );
}

const Wrap = styled.div``;
