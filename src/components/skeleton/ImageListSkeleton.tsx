import { range } from '@/utils/array';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Masonry from 'react-masonry-css';
import { styled } from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ImageListSkeleton() {
  const [items, _] = useState(range(1, 20));

  // Function to generate random height between 140 and 230 for each skeleton item
  const getRandomHeight = () => {
    return Math.floor(Math.random() * (230 - 140 + 20)) + 140;
  };

  return (
    <Wrap>
      <Masonry breakpointCols={2} className="image-list">
        {items.map((item) => (
          <Skeleton
            key={item}
            height={getRandomHeight()}
            style={{ marginBottom: '5px' }}
          />
        ))}
      </Masonry>
    </Wrap>
  );
}

const Wrap = styled.div`
  .image-list {
    display: flex;
    gap: 5px;
  }
`;
