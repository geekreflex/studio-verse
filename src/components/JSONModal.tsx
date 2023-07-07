import { useEditorContext } from '@/context/EditorContext';
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Modal from './common/Modal';
import { useAppDispatch } from '@/app/hooks';
import { toggleJsonModal } from '@/features/appSlice';
import { Button } from '@/styles/global';
import { IoCopyOutline } from 'react-icons/io5';

export default function JSONModal() {
  const dispatch = useAppDispatch();
  const preRef = useRef<HTMLPreElement>(null);
  const { editor } = useEditorContext();

  useEffect(() => {
    if (editor) {
      const json = editor.canvas.toJSON([
        'selectable',
        'evented',
        'id',
        'name',
      ]);
      if (preRef.current) {
        preRef.current.innerHTML = JSON.stringify(json, null, 2);
      }
    }
  }, [editor]);

  const handleClose = () => {
    dispatch(toggleJsonModal(false));
  };

  return (
    <Modal title="JSON Object" close={handleClose}>
      <Wrap>
        <div className="json-wrap">
          <pre ref={preRef} />
        </div>

        <div className="copy-btn-wrap">
          <Button>
            <span id="btn-icon">
              <IoCopyOutline />
            </span>
            <span id="btn-text">Copy Object</span>
          </Button>
        </div>
      </Wrap>
    </Modal>
  );
}

const Wrap = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  height: 100%;

  .json-wrap {
    overflow-y: scroll;
    padding: 20px;
    height: 70vh;
  }

  .copy-btn-wrap {
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
`;
