import { useEditorContext } from '@/context/EditorContext';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Modal from './common/Modal';
import { useAppDispatch } from '@/app/hooks';
import { toggleJsonModal } from '@/features/appSlice';

export default function JSONModal() {
  const dispatch = useAppDispatch();
  const { editor } = useEditorContext();
  const [json, setJson] = useState<any>();

  useEffect(() => {
    if (editor) {
      const json = editor.canvas.toJSON([
        'selectable',
        'evented',
        'id',
        'name',
      ]);
      setJson(JSON.stringify(json));
    }
  }, [editor]);

  const handleClose = () => {
    dispatch(toggleJsonModal(false));
  };

  return (
    <Modal title="JSON Object" close={handleClose}>
      <Wrap>{json}</Wrap>
    </Modal>
  );
}

const Wrap = styled.div`
  width: 600px;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  word-wrap: break-word;
  flex: 1;
  height: 60vh;
`;
