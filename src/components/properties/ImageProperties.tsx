import { styled } from 'styled-components';
import MoreAction from '../MoreAction';
import Shadow from '../Shadow';
import Stroke from '../Stroke';
import { Button } from '@/styles/global';
import { IoColorFilterOutline } from 'react-icons/io5';

export default function ImageProperties() {
  return (
    <Wrap>
      <div className="btn-wrap">
        <Button>
          <span id="btn-icon">
            <IoColorFilterOutline />
          </span>
          <span id="btn-text">Edit Image</span>
        </Button>
      </div>
      <MoreAction />
      <Shadow />
      <Stroke />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
