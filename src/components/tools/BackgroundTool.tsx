import { BgIcon } from '@/icons';
import { Button } from '@/styles/global';
import { styled } from 'styled-components';
import ImageList from '../common/ImageList';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { fetchBackgrounds } from '@/features/imagesSlice';
import { switchPropertyPanel } from '@/features/appSlice';

export default function BackgroundTool() {
  const dispatch = useAppDispatch();
  const { backgrounds, status, error } = useAppSelector(
    (state) => state.images
  );

  useEffect(() => {
    dispatch(fetchBackgrounds(1));
  }, []);

  const handleEditBg = () => {
    dispatch(switchPropertyPanel('background'));
  };

  return (
    <Wrap>
      <div className="btn-wrap">
        <Button onClick={handleEditBg}>
          <span id="btn-icon">
            <BgIcon />
          </span>
          <span id="btn-text">Edit background</span>
        </Button>
      </div>
      <ImageList
        images={backgrounds}
        type="background"
        status={status}
        error={error}
      />
    </Wrap>
  );
}

const Wrap = styled.div``;
