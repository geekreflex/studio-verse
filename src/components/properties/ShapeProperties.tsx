import { styled } from 'styled-components';
import Fill from '../Fill';
import MoreAction from '../MoreAction';
import Stroke from '../Stroke';
import Shadow from '../Shadow';
import PolygonProps from '../PolygonProps';
import { useEditorContext } from '@/context/EditorContext';

export default function ShapeProperties() {
  const { selectedType } = useEditorContext();
  return (
    <Wrap className="props-wrap">
      <Fill />
      <Stroke />
      {selectedType === 'polygon' && <PolygonProps />}
      <MoreAction />
      <Shadow />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
