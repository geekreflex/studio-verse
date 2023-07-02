import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEditorContext } from '@/context/EditorContext';
import { Editor } from '@/core/Editor';
import { setPreviewImg } from '@/features/editorSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { fabric } from 'fabric';
import { debounce } from 'lodash-es';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

interface DesignPreviewProps {
  format: string;
  quality: number;
}

const handleCreateImg = debounce(
  (
    editor: Editor | null,
    dispatch: Dispatch,
    format: string,
    quality: number
  ) => {
    if (editor) {
      const workspace = editor.canvas
        .getObjects()
        .find((obj) => obj.id === 'workspace');
      const { width, height, top, left } = workspace as fabric.Object;
      const options = {
        name: 'Preview Image',
        format: format,
        quality: quality / 100,
        multiplier: 2,
        width,
        height,
        top,
        left,
      };

      editor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      editor.canvas.renderAll();
      const dataUrl = editor.canvas.toDataURL(options);
      editor.zoomToFit();

      dispatch(setPreviewImg(dataUrl));
    }
  },
  100
);

export default function DesignPreview({ format, quality }: DesignPreviewProps) {
  const dispatch = useAppDispatch();
  const { previewImg } = useAppSelector((state) => state.editor);
  const { editor } = useEditorContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const generatePreviewImg = async () => {
      handleCreateImg(editor, dispatch, format, quality);
      setLoading(false);
    };

    generatePreviewImg();

    return () => {
      // Cleanup: Cancel any pending debounced calls
      handleCreateImg.cancel();
    };
  }, [editor, format, quality, dispatch]);

  return (
    <Wrap>
      {(loading || previewImg === '') && <p>Loading...</p>}
      {previewImg && (
        <div className="preview-img-wrap">
          <img src={previewImg} alt="" />
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 300px;
  width: 100%;

  .preview-img-wrap {
    display: flex;
    padding: 0 20px;
    img {
      width: 100%;
    }
  }
`;
