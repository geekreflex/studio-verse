import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchImages } from '@/features/imagesSlice';
import { AddImageIcon } from '@/icons';
import { Button } from '@/styles/global';
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import ImageList from '../common/ImageList';
import { fabric } from 'fabric';
import { useEditorContext } from '@/context/EditorContext';

export default function ImagesTool() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { editor } = useEditorContext();
  const { images, status, error } = useAppSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages(1));
  }, []);

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgElement = document.createElement('img');
        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement);
          fabricImage.scaleToWidth(editor?.workspace?.width! / 2);
          if (editor) {
            editor.canvas.add(fabricImage);
          }
        };
        imgElement.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Wrap>
      <div className="btn-wrap">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <Button onClick={handleAddImage}>
          <span id="btn-icon">
            <AddImageIcon />
          </span>
          <span id="btn-text">Upload image</span>
        </Button>
      </div>
      <ImageList images={images} status={status} error={error} type="image" />
    </Wrap>
  );
}

const Wrap = styled.div``;
