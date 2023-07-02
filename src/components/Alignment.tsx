import {
  AlignBottomIcon,
  AlignHorizontalIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalIcon,
} from '@/icons';
import { styled } from 'styled-components';
import Tooltip from './common/Tooltip';
import { useEditorContext } from '@/context/EditorContext';
import { TitleSmall } from '@/styles/global';

const list = [
  { name: 'Align Left', icon: <AlignLeftIcon />, action: 'left' },
  {
    name: 'Align Horizontally',
    icon: <AlignHorizontalIcon />,
    action: 'horizontal',
  },
  { name: 'Align Right', icon: <AlignRightIcon />, action: 'right' },
  { name: 'Align Top', icon: <AlignTopIcon />, action: 'top' },
  {
    name: 'Align Vertically',
    icon: <AlignVerticalIcon />,
    action: 'vertical',
  },
  { name: 'Align Bottom', icon: <AlignBottomIcon />, action: 'bottom' },
];

export default function Alignment() {
  const { controller } = useEditorContext();

  const handleAlignment = (action: string) => {
    controller?.align(action);
  };

  return (
    <Wrap>
      <TitleSmall>Layer align</TitleSmall>
      <div className="align-wrap">
        {list.map((item, index) => (
          <Tooltip content={item.name}>
            <span
              key={index}
              className="iconn"
              onClick={() => handleAlignment(item.action)}
            >
              {item.icon}
            </span>
          </Tooltip>
        ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  .align-wrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;
