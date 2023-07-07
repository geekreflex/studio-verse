import { renderTitle } from '@/utils/string';
import { fabric } from 'fabric';
import { styled } from 'styled-components';

interface LayerTitleProps {
  obj: fabric.Object;
}

export default function LayerTitle({ obj }: LayerTitleProps) {
  return (
    <Wrap>
      <p className="object-name">
        {obj.type === 'textbox'
          ? (obj as fabric.Textbox).text
          : renderTitle(obj.type)}
      </p>
    </Wrap>
  );
}

const Wrap = styled.div`
  .object-name {
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    overflow: hidden;
    width: 100px;
  }
`;
