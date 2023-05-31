import Panel from '@/components/common/Drawer';
import { useEditorContext } from '@/context/EditorContext';
import { ObjectTypes } from '@/types/editor';
import { useEffect } from 'react';
import ElementProperties from './ElementProperties';

export default function PropertiesPanel() {
  const { selectedType, selectedObjects, clearSelectedObjects } =
    useEditorContext();

  const onClosePropertyPanel = () => {
    clearSelectedObjects();
  };

  useEffect(() => {
    console.log(selectedObjects?.length);
    console.log(selectedObjects);
  }, [selectedObjects]);

  const renderTitle = () => {
    if (
      selectedType === ObjectTypes.Circle ||
      selectedType === ObjectTypes.Rectangle ||
      selectedType === ObjectTypes.Triangle ||
      selectedType === ObjectTypes.Polygon
    ) {
      return 'Edit Element';
    }
  };

  const RenderPanel = () => {
    switch (selectedType) {
      case ObjectTypes.Circle:
      case ObjectTypes.Polygon:
      case ObjectTypes.Rectangle:
      case ObjectTypes.Triangle:
        return (
          <ElementProperties type={selectedType} object={selectedObjects} />
        );
      default:
        return '';
    }
  };

  return (
    <Panel
      visible={!!selectedObjects}
      close={onClosePropertyPanel}
      pos="right"
      title={renderTitle()}
    >
      {RenderPanel()}
    </Panel>
  );
}
