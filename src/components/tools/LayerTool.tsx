import { styled } from 'styled-components';
import Tab from '../common/Tab';
import { useEffect, useState } from 'react';
import { useEditorContext } from '@/context/EditorContext';
import { fabric } from 'fabric';
import { LuLock, LuEye } from 'react-icons/lu';

import Tooltip from '../common/Tooltip';
import LayerPreview from '../excerpt/LayerPreview';
import LayerTitle from '../excerpt/LayerTitle';

export default function LayerTool() {
  const { editor, selectedObjects } = useEditorContext();
  const [activeTab, setActiveTab] = useState('Layers');
  const tabList = [{ name: 'Layers' }, { name: 'Groups' }];
  const [objects, setObjects] = useState<fabric.Object[]>([]);

  useEffect(() => {
    if (editor) {
      const getObjects = () => {
        const objects = editor.canvas.getObjects();
        const filteredObjects = objects.filter(
          (object) => object.id !== 'workspace'
        );
        setObjects(filteredObjects);
      };

      getObjects();

      editor.canvas.on('object:added', getObjects);
      editor.canvas.on('object:modified', getObjects);
      editor.canvas.on('object:removed', getObjects);

      return () => {
        editor.canvas.off('object:added', getObjects);
        editor.canvas.off('object:modified', getObjects);
        editor.canvas.off('object:removed', getObjects);
      };
    }
  }, [editor]);

  const handleClick = (id: string) => {
    const selected = editor?.canvas.getObjects().find((obj) => obj.id === id);
    editor?.canvas.setActiveObject(selected as any);
    editor?.canvas.renderAll();
  };

  return (
    <Wrap>
      <div className="">
        <Tab tabs={tabList} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div>
        {activeTab === 'Layers' && (
          <div className="layer-list">
            {objects?.map((obj, index) => (
              <div
                onClick={() => handleClick(obj.id as string)}
                key={index}
                className={`layer-item ${
                  selectedObjects?.some((itm) => itm.id == obj.id)
                    ? 'active-obj'
                    : ''
                }`}
              >
                <div className="layer-item-left">
                  <LayerPreview obj={obj} />
                  <LayerTitle obj={obj} />
                </div>
                <div className="layer-item-right">
                  <Tooltip content="Lock Layer">
                    <button className="iconn">
                      <LuLock />
                    </button>
                  </Tooltip>
                  <Tooltip content="Hide Layer">
                    <button className="iconn">
                      <LuEye />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Groups' && <div></div>}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .layer-list {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .layer-item {
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      padding: 5px;
      display: flex;
      align-items: center;
      border-radius: ${(props) => props.theme.radius.small};
      background-color: ${(props) => props.theme.colors.hoverColor};
      cursor: pointer;
      gap: 10px;
      &:hover {
        background-color: ${(props) => props.theme.colors.accent}20;
        border-color: ${(props) => props.theme.colors.accent}30;

        .layer-item-right {
          visibility: visible;
          opacity: 1;
        }
      }
    }

    .layer-item-left {
      display: flex;
      align-items: center;
      width: 70%;
      gap: 10px;
    }

    .layer-item-right {
      display: flex;
      align-items: center;
      visibility: hidden;
      opacity: 0;

      .iconn {
        font-size: 16px;
        &:hover {
          background-color: transparent;
        }
      }
    }

    .active-obj {
      background-color: ${(props) => props.theme.colors.accent}20;
      border-color: ${(props) => props.theme.colors.accent}30;
    }
  }
`;
