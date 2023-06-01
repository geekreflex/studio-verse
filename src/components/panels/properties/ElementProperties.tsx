import { styled } from 'styled-components';
import { Fill, Stroke } from './widgets';

export default function ElementProperties() {
  return (
    <Wrap>
      <div className="color-block-wrap">
        <Fill />
        <Stroke />
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 100%;
  .color-block-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
`;
