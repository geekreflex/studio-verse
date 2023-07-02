import { styled } from 'styled-components';

export default function Loading() {
  return (
    <Wrap>
      <h1>Loading...</h1>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999998;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
`;
