import { styled } from 'styled-components';
import ObjectOptions from '../MoreAction';
import { Button } from '@/styles/global';
import { AiOutlineGroup, AiOutlineUngroup } from 'react-icons/ai';
import { useEditorContext } from '@/context/EditorContext';
import { useEffect, useState } from 'react';
import Shadow from '../Shadow';

export default function SelectionProperties() {
  const { controller, selectedType } = useEditorContext();
  const [objectType, setObjectType] = useState('');

  useEffect(() => {
    if (selectedType === 'group') {
      setObjectType('group');
    }
    if (selectedType === 'activeSelection') {
      setObjectType('activeSelection');
    }
  }, [selectedType]);

  const handleGroup = () => {
    if (controller) {
      controller.group();
      setObjectType('group');
    }
  };

  const handleUngroup = () => {
    if (controller) {
      controller.ungroup();
      setObjectType('activeSelection');
    }
  };

  return (
    <Wrap>
      {objectType === 'activeSelection' && (
        <div className="btn-wrap">
          <Button onClick={handleGroup}>
            <span id="btn-icon">
              <AiOutlineGroup />
            </span>
            <span id="btn-text">Group</span>
          </Button>
        </div>
      )}
      {objectType === 'group' && (
        <div className="btn-wrap">
          <Button onClick={handleUngroup}>
            <span id="btn-icon">
              <AiOutlineUngroup />
            </span>
            <span id="btn-text">Ungroup</span>
          </Button>
        </div>
      )}
      <ObjectOptions />
      <Shadow />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
