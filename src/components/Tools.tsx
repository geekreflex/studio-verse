import { IconName } from '@/types/icon';
import { styled } from 'styled-components';
import Icon from './shared/Icon';
import { useAppDispatch } from '@/app/hooks';
import { switchActiveTool } from '@/features/appSlice';
import Tooltip from './shared/Tooltip';

export default function Tools() {
  const dispatch = useAppDispatch();
  interface ITools {
    name: string;
    icon: IconName;
    disabled?: boolean;
    alias?: 'element';
    desc?: string;
  }

  const tools: ITools[] = [
    { name: 'Elements', icon: 'shapesIcon', desc: 'Elements and shapes' },
    { name: 'Images', icon: 'imageIcon', desc: 'Upload or browse images' },
    { name: 'Text', icon: 'textIcon', desc: 'Add text' },
    {
      name: 'Templates',
      icon: 'grid3Icon',
      desc: 'Start from a pre-built layout',
    },
    { name: 'Draw', icon: 'brushIcon', desc: 'Free drawing' },
    { name: 'Customize', icon: 'bgIcon', desc: 'Customize workspace' },
  ];

  const onToolClick = (tool: string) => {
    dispatch(switchActiveTool(tool));
  };

  return (
    <Wrap>
      {tools.map((tool) => (
        <Tooltip
          key={tool.name}
          content={tool.desc || tool.name}
          placement={'right'}
        >
          <Icon
            name={tool.icon as IconName}
            disabled={tool.disabled}
            label={tool.name}
            size="big"
            click={() => onToolClick(tool.name.toLowerCase())}
          />
        </Tooltip>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
