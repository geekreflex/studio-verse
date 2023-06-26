import { styled } from 'styled-components';
import Text from '../Text';
import Stroke from '../Stroke';
import Shadow from '../Shadow';

export default function TextProperties() {
  return (
    <Wrap>
      <Text />
      <Stroke />
      <Shadow />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
