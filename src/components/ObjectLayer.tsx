import {
  BackwardIcon,
  BringFrontIcon,
  ForwardIcon,
  SendBackIcon,
} from '@/icons';
import { TitleSmall } from '@/styles/global';
import { styled } from 'styled-components';
import Tooltip from './common/Tooltip';
import { useEditorContext } from '@/context/EditorContext';

export default function ObjectLayer() {
  const { controller } = useEditorContext();
  const items = [
    { name: 'Bring Forward', icon: <ForwardIcon />, action: 'forward' },
    { name: 'Send Backwards', icon: <BackwardIcon />, action: 'backward' },
    { name: 'Bring to front', icon: <BringFrontIcon />, action: 'front' },
    { name: 'Send to back', icon: <SendBackIcon />, action: 'back' },
  ];

  const handleLayer = (action: string) => {
    if (controller) {
      controller.order(action);
    }
  };

  return (
    <Wrap>
      <TitleSmall>Object Layer</TitleSmall>
      <div className="obj-layer-wrap">
        {items.map((item) => (
          <div key={item.name} className="obj-layer-item" title={item.name}>
            <Tooltip content={item.name}>
              <button
                onClick={() => handleLayer(item.action)}
                className="iconn"
              >
                {item.icon}
              </button>
            </Tooltip>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  .obj-layer-wrap {
    display: flex;
    gap: 10px;
  }

  .obj-layer-item {
  }
`;
