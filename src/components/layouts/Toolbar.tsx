import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Tooltip from '@/components/common/Tooltip';
import { useEditorContext } from '@/context/EditorContext';
import { switchActiveTool } from '@/features/appSlice';
import {
  BgIcon,
  BrushIcon,
  Grid1Icon,
  Grid3Icon,
  ImageIcon,
  LayerIcon,
  ShapesIcon,
  TextIcon,
} from '@/icons';
import { LineX } from '@/styles/global';
import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface ITool {
  name: string;
  icon: React.ReactNode;
  disabled?: boolean;
  alias?: 'element';
  description: string;
}

const tools: ITool[] = [
  {
    name: 'Elements',
    icon: <ShapesIcon />,
    description: 'Elements and shapes',
  },
  {
    name: 'Images',
    icon: <ImageIcon />,
    description: 'Upload or browse images',
  },
  {
    name: 'Text',
    icon: <TextIcon />,
    description: 'Add text',
  },
  {
    name: 'Templates',
    icon: <Grid3Icon />,
    description: 'Start from a pre-built layout',
  },
  {
    name: 'Draw',
    icon: <BrushIcon />,
    description: 'Free drawing',
  },
  {
    name: 'Backgrounds',
    icon: <BgIcon />,
    description: 'Choose a desired background',
  },
  {
    name: 'Layers',
    icon: <LayerIcon />,
    description: 'Layers and groups',
  },
];

export default function Toolbar() {
  const dispatch = useAppDispatch();
  const { draw } = useEditorContext();
  const gliderRef = useRef<HTMLDivElement>(null);
  const [gliderWidth, setGliderWidth] = useState(0);
  const [gliderOffset, setGliderOffset] = useState(0);
  const { activeTool } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!gliderRef.current) {
      return;
    }

    const activeTabElement = gliderRef.current.querySelector(
      '.active'
    ) as HTMLElement | null;
    if (activeTabElement) {
      const offsetTop = activeTabElement.offsetTop;
      const height = activeTabElement.offsetHeight;
      setGliderOffset(offsetTop);
      setGliderWidth(height);
    }
  }, [activeTool]);

  const onToolClick = (tool: ITool) => {
    dispatch(switchActiveTool(tool.name));
    if (tool.name === 'Draw') {
      draw?.start();
    } else {
      draw?.end();
    }
  };

  return (
    <Wrap ref={gliderRef}>
      <div className="logo">
        <Grid1Icon />
      </div>
      <LineX />
      <div className="tools-wrap">
        {tools.map((tool) => (
          <Tooltip
            key={tool.name}
            content={tool.description}
            placement={'right'}
          >
            <div
              className={`tool ${
                activeTool?.toLowerCase() === tool.name.toLowerCase()
                  ? 'active'
                  : ''
              }`}
              onClick={() => onToolClick(tool)}
            >
              {tool.icon}
            </div>
          </Tooltip>
        ))}
      </div>
      <div
        className="glider"
        style={{
          transform: `translateY(${gliderOffset}px)`,
          height: `${gliderWidth}px`,
        }}
      ></div>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 60px;
  height: 95vh;
  left: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.radius.small};
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border: 1px solid ${(props) => props.theme.colors.borderColor};

  .logo {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
  }

  .tools-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 5px;
    gap: 5px;

    .tool {
      position: relative;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      z-index: 99;
      border-radius: ${(props) => props.theme.radius.small};
      border: 1px solid transparent;

      /* &:hover {
        background-color: ${(props) => props.theme.colors.hoverColor};
        border: 1px solid ${(props) => props.theme.colors.borderColor};
      } */
    }
    .active {
      /* &:hover {
        background-color: ${(props) => props.theme.colors.hoverActiveColor};
        border: 1px solid ${(props) => props.theme.colors.borderColor};
      } */
    }
  }

  .glider {
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    background-color: ${(props) => props.theme.colors.hoverActiveColor};
    border: 1px solid transparent;
    transition: transform 0.3s ease-in-out;
    width: 50px;
    left: 5px;
    z-index: 1;
    border-radius: ${(props) => props.theme.radius.small};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
  }
`;
