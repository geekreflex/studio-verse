import { ArrowDownIcon } from '@/icons';
import styled from 'styled-components';
import NumberInput from '../common/NumberInput';
import FontBIU from '../FontBIU';
import TextStyleAlgin from '../TextStyleAlign';
import MoreAction from '../MoreAction';
import FillColorBlock from '../FillColorBlock';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEditorContext } from '@/context/EditorContext';
import { useEffect, useRef, useState } from 'react';
import { setObject } from '@/features/editorSlice';
import useClickOutside from '@/hooks/useClickOutside';
import FontList from '../widget/FontList';
import Stroke from '../Stroke';
import Shadow from '../Shadow';

export default function TextProperties() {
  const dispatch = useAppDispatch();
  const fontListRef = useRef(null);
  const { editor, controller } = useEditorContext();
  const { object } = useAppSelector((state) => state.editor);
  const [fontListVisible, setFontListVisible] = useState(false);

  useEffect(() => {
    if (editor) {
      editor.canvas.on('object:scaling', (e: fabric.IEvent) => {
        const target = e.target as fabric.Textbox;
        if (target instanceof fabric.Textbox) {
          dispatch(setObject({ fontSize: target.fontSize }));
          const scaleFactor = target.scaleX!;
          const originalFontSize = target.fontSize;
          const newFontSize = (originalFontSize! * scaleFactor).toFixed();
          target.set('fontSize', parseFloat(newFontSize));
          target.set('width', scaleFactor * target.width!);
          target.set('scaleX', 1);
          target.set('scaleY', 1);
          target.setCoords();
          target.canvas?.requestRenderAll();
        }
      });
    }
  }, [editor]);

  const handleFontSizeChange = (size: number) => {
    controller?.fontSize(size);
    dispatch(setObject({ fontSize: size }));
  };

  useClickOutside(fontListRef, () => setFontListVisible(false));

  return (
    <Wrap className="prop-wrap">
      <h4>Text</h4>
      <div className="main-wrap">
        <div className="main-font-props" ref={fontListRef}>
          <button
            className="font-select btn-text-arrow"
            onClick={() => setFontListVisible(true)}
          >
            <span style={{ fontFamily: object?.fontFamily }}>
              {object?.fontFamily}
            </span>
            <span className="arrow">
              <ArrowDownIcon />
            </span>
          </button>
          {fontListVisible && (
            <FontList close={() => setFontListVisible(false)} />
          )}
        </div>
        <div className="size-color-wrap">
          <div className="font-size-wrap">
            <NumberInput
              value={object?.fontSize!}
              onChange={handleFontSizeChange}
            />
          </div>
          <div className="fill-wrap">
            <FillColorBlock />
          </div>
          <div className="font-spacing"></div>
        </div>
        <div className="align-biu-wrap">
          <div className="bui-wrap">
            <FontBIU />
          </div>
          <div className="style-align-wrap">
            <TextStyleAlgin />
          </div>
        </div>
      </div>
      <MoreAction />
      <Stroke />
      <Shadow />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  gap: 10px;

  .main-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .size-color-wrap {
    display: flex;
    gap: 5px;

    .font-size-wrap {
      width: 65%;
    }

    .font-spacing {
      width: 35px;
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      border-radius: ${(props) => props.theme.radius.small};
    }
  }

  .align-biu-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;

    .style-align-wrap {
      width: 60%;
    }
  }
`;
