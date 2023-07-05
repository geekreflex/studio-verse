import { styled } from 'styled-components';
import { useEditorContext } from '@/context/EditorContext';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setObject } from '@/features/editorSlice';
import { STROKE } from '@/core/lib/defaultShapes';
import NumberInput from './common/NumberInput';
import Select from './common/Select';

import Expander from './common/Expander';
import { useEffect, useRef, useState } from 'react';
import ColorBlock from './common/ColorBlock';
import useClickOutside from '@/hooks/useClickOutside';
import ColorPicker from './widget/ColorPicker';
import Range from './common/Range';
import { RxBorderStyle } from 'react-icons/rx';
import Tooltip from './common/Tooltip';

export default function Stroke() {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const { object } = useAppSelector((state) => state.editor);
  const { editor } = useEditorContext();

  useEffect(() => {
    if (object && object.stroke) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [object]);

  const handleStrokeChange = (color: string) => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject();
      if (activeObject) {
        activeObject.set({ stroke: color });
        dispatch(setObject({ stroke: color }));
      }
      editor.canvas.renderAll();
    }
  };

  const handleAddStroke = () => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject();
      activeObject?.set({ stroke: STROKE, strokeWidth: 1 });
      dispatch(setObject({ stroke: STROKE, strokeWidth: 1 }));
      editor.canvas.renderAll();
    }
  };

  const handleClearStroke = () => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject();
      activeObject?.set({ stroke: undefined, strokeWidth: 0 });
      dispatch(setObject({ stroke: undefined, strokeWidth: 0 }));
      editor.canvas.renderAll();
    }
  };

  const handleStrokeWidth = (width: number) => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject();
      activeObject?.set({ strokeWidth: width });
      dispatch(setObject({ strokeWidth: width }));
      editor.canvas.renderAll();
    }
  };

  const handleStrokeStyle = (value: string) => {
    if (editor) {
      const activeObject = editor.canvas.getActiveObject();
      const arr = value ? value.split(' ').map(Number) : [];
      activeObject?.set({ strokeDashArray: arr });
      dispatch(setObject({ strokeDashArray: arr }));
      editor.canvas.renderAll();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    if (!val) {
      handleClearStroke();
    } else {
      handleAddStroke();
    }
    setChecked(val);
  };

  const strokeStyles = [
    { label: 'Solid', value: '' },
    { label: 'Dashed', value: '30 10' },
    { label: 'Dotted', value: '5 5' },
  ];

  const handleShowColorPicker = () => {
    setVisible(true);
  };

  const handleCloseColorPicker = () => {
    setVisible(false);
  };

  useClickOutside(ref, () => handleCloseColorPicker());

  return (
    <Expander
      checked={checked}
      onChange={handleChange}
      onAdd={handleAddStroke}
      label="Stroke"
    >
      <Wrap>
        <div className="color-block-wrap" ref={ref}>
          <h4>Color</h4>
          <ColorBlock
            color={object?.stroke as string}
            onClick={handleShowColorPicker}
          />
          {visible && (
            <ColorPicker
              color={object?.stroke as string}
              onChange={handleStrokeChange}
              label="Fill"
              close={handleCloseColorPicker}
            />
          )}
        </div>
        <div className="stroke-select-style">
          <div className="select-wrap">
            <Select
              options={strokeStyles}
              value={object?.strokeDashArray?.join(' ') as string}
              onChange={handleStrokeStyle}
            />
          </div>
          <div>
            <Tooltip content="Advance strokes" placement={'bottom'}>
              <button className="iconn">
                <RxBorderStyle />
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <div className="input-number-range-wrap">
            <h4>Thickness</h4>
            <div className="number-wrap">
              <NumberInput
                value={object?.strokeWidth || 0}
                onChange={handleStrokeWidth}
              />
            </div>
          </div>
          <Range
            min={0}
            max={100}
            step={1}
            value={object?.strokeWidth || 0}
            onChange={handleStrokeWidth}
          />
        </div>
      </Wrap>
    </Expander>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .color-block-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 14px;
    }
  }

  .stroke-size-type {
    display: flex;
    gap: 10px;
  }

  .stroke-select-style {
    display: flex;
    gap: 10px;

    .select-wrap {
      flex: 1;
      width: 100%;
    }
  }
`;
