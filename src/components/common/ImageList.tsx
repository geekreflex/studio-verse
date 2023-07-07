import { useEditorContext } from '@/context/EditorContext';
import { IStatus, Image } from '@/types/app';
import Masonry from 'react-masonry-css';
import { styled } from 'styled-components';
import ImageListSkeleton from '../skeleton/ImageListSkeleton';
import { useEffect } from 'react';

interface ImageListProps {
  images: Image[];
  type: 'image' | 'background';
  status: IStatus;
  error: string | null;
}

export default function ImageList({
  images,
  type,
  status,
  error,
}: ImageListProps) {
  const { tool, editor } = useEditorContext();

  const onAddImage = (imageUrl: string) => {
    if (type === 'image') {
      tool?.addImage(imageUrl);
    }

    if (type === 'background') {
      editor?.setBackgroundImage(imageUrl);
    }
  };

  const handleDrag = (imageUrl: string) => {
    onAddImage(imageUrl);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      console.log('call fetch more');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (status === 'loading') {
    return <ImageListSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Wrap>
      <Masonry breakpointCols={2} className="image-list">
        {images.map((image, index) => (
          <div
            draggable={true}
            key={index}
            className="image"
            onDragEnd={() => handleDrag(image.src.large)}
            onClick={() => onAddImage(image.src.large)}
          >
            <img src={image.src.medium} />
          </div>
        ))}
      </Masonry>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  overflow-y: auto;
  height: 100%;
  margin-bottom: 60px;

  .image-list {
    display: flex;
    gap: 5px;
  }

  .image {
    position: relative;
    display: flex;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: ${(props) => props.theme.radius.medium};
    overflow: hidden;

    img {
      width: 100%;
      transition: all 300ms;
    }
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;
      z-index: 9;
      opacity: 0;
      transition: all 300ms;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
      &::before {
        opacity: 1;
      }
    }
  }
`;
