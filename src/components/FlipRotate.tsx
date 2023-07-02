import { styled } from 'styled-components';
import { useRef } from 'react';
import { useEditorContext } from '@/context/EditorContext';
import {
  ArrowSwapXIcon,
  ArrowSwapYIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from '@/icons';
import Tooltip from './common/Tooltip';
import { LineY, TitleSmall } from '@/styles/global';

export default function FlipRotate() {
  const { controller } = useEditorContext();
  const ref = useRef(null);

  const flips = [
    {
      name: 'Horizontal',
      icon: <ArrowSwapXIcon />,
      func: () => controller?.flipX(),
      alias: 'flipx',
    },

    {
      name: 'Vertical',
      icon: <ArrowSwapYIcon />,
      func: () => controller?.flipY(),
      alias: 'flipy',
    },
  ];

  const rotates = [
    {
      name: 'Rotate Left 90°',
      icon: <RotateLeftIcon />,
      func: () => controller?.rotate(-90),
      alias: 'r-left',
    },
    {
      name: 'Rotate Right 90°',
      icon: <RotateRightIcon />,
      func: () => controller?.rotate(90),
      alias: 'r-right',
    },
  ];

  return (
    <Wrap ref={ref}>
      <TitleSmall>Flip & Rotate</TitleSmall>
      <div className="flip-rot-main">
        <div className="flip-wrap flip-rot-group-wrap">
          {flips.map((item) => (
            <Tooltip content={item.name}>
              <button key={item.name} onClick={item.func} className="iconn">
                {item.icon}
              </button>
            </Tooltip>
          ))}
        </div>
        <div className="rotate-wrap flip-rot-group-wrap">
          {rotates.map((item) => (
            <Tooltip content={item.name}>
              <button key={item.name} onClick={item.func} className="iconn">
                {item.icon}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .flip-rot-main {
    display: flex;
    align-items: center;

    justify-content: space-between;
  }

  .flip-rot-group-wrap {
    display: flex;
    gap: 10px;
  }
`;
