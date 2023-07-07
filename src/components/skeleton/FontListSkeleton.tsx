import { range } from '@/utils/array';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { styled } from 'styled-components';

export default function FontListSkeleton() {
  const [items, _] = useState(range(1, 50));
  return (
    <Wrap>
      {items.map((item) => (
        <Skeleton key={item} height={25} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
`;
