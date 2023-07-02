import { styled } from 'styled-components';
import Modal from './common/Modal';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleDownloadModal } from '@/features/appSlice';
import DesignPreview from './DesignPreview';
import { useState } from 'react';
import Tab from './common/Tab';
import Range from './common/Range';
import NumberInput from './common/NumberInput';
import { Button, ButtonSecondary } from '@/styles/global';
import { useEditorContext } from '@/context/EditorContext';
import { setPreviewImg } from '@/features/editorSlice';

export default function DownloadModal() {
  const dispatch = useAppDispatch();
  const { editor } = useEditorContext();
  const { previewImg } = useAppSelector((state) => state.editor);
  const [filename, setFilename] = useState('Verse Design');
  const [format, setFormat] = useState('PNG');
  const [quality, setQuality] = useState(80);

  const handleClose = () => {
    dispatch(toggleDownloadModal(false));
    dispatch(setPreviewImg(''));
  };

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilename(value);
  };

  const handleQualityChange = (qty: number) => {
    setQuality(qty);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = previewImg;
    downloadLink.download = `${filename}.${format.toLowerCase()}`;
    downloadLink.click();
  };

  const formats = [{ name: 'PNG' }, { name: 'JPG' }, { name: 'PDF' }];

  return (
    <Modal close={handleClose}>
      <Wrap>
        <section className="preview-wrap">
          <DesignPreview quality={quality} format={format} />
          <div className="dimensions">
            <p>Dimensions</p>
            <h4>
              {editor?.workspace?.width} &times; {editor?.workspace?.height}
            </h4>
          </div>
        </section>
        <section className="download-options">
          <div className="title">
            <h3>Save to Computer</h3>
          </div>
          <div className="options-wrap">
            <div className="input-wrap">
              <label>File name</label>
              <input
                type="text"
                value={filename}
                onChange={handleFilenameChange}
              />
            </div>
            <div className="format-wrap">
              <p>Format</p>
              <div className="tabs-wrap">
                <Tab
                  activeTab={format}
                  tabs={formats}
                  setActiveTab={setFormat}
                />
              </div>
            </div>

            <div className="quality-wrap">
              <div className="input-number-range-wrap">
                <h4>Quality</h4>
                <div className="number-wrap">
                  <NumberInput value={quality} onChange={handleQualityChange} />
                </div>
              </div>
              <Range
                value={quality}
                onChange={handleQualityChange}
                step={1}
                max={100}
                min={1}
              />
            </div>
          </div>
          <div className="download-ccl-btns">
            <ButtonSecondary onClick={handleClose}>
              <span id="btn-text">Cancel</span>
            </ButtonSecondary>
            <Button onClick={handleDownload}>
              <span id="btn-text">Download</span>
            </Button>
          </div>
        </section>
      </Wrap>
    </Modal>
  );
}

const Wrap = styled.div`
  width: 900px;
  max-width: 100%;
  display: flex;
  height: 100%;

  .preview-wrap {
    width: 65%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  section {
    padding: 20px;
  }

  .download-options {
    flex: 1;
    border-left: 1px solid ${(props) => props.theme.colors.borderColor};
    display: flex;
    flex-direction: column;
  }

  .title {
    margin-bottom: 30px;
  }

  .options-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
  }

  .input-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      font-size: 14px;
      margin-bottom: 5px;
    }

    input {
      background-color: transparent;
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      color: ${(props) => props.theme.colors.textColor};
      font-size: 14px;
      height: 32px;
      padding: 0 10px;
      border-radius: ${(props) => props.theme.radius.small};
      font-weight: 600;
    }
  }

  .format-wrap {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      font-size: 14px;
    }

    .tabs-wrap {
      width: 200px;
    }

    .tab {
      text-align: center;
    }
  }

  .quality-wrap {
    background-color: ${(props) => props.theme.colors.hoverActiveColor}50;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: ${(props) => props.theme.radius.small};
    padding: 10px;
  }

  .download-ccl-btns {
    display: flex;
    gap: 10px;
  }

  .dimensions {
    color: #eee;
    p {
      margin-bottom: 5px;
      font-size: 12px;
    }

    h4 {
      font-size: 14px;
    }
  }
`;
