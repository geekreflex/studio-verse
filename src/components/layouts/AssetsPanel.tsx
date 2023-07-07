import { styled } from 'styled-components';
import Panel from '../common/Panel';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ElementsTool from '../tools/ElementsTool';
import TextTool from '../tools/TextTool';
import LayerTool from '../tools/LayerTool';
import ImagesTool from '../tools/ImagesTool';
import BackgroundTool from '../tools/BackgroundTool';
import { switchActiveTool } from '@/features/appSlice';
import TemplatesTool from '../tools/TemplatesTool';
import DrawingTool from '../tools/DrawingTool';

export default function AssetsPanel() {
  const dispatch = useAppDispatch();
  const { activeTool } = useAppSelector((state) => state.app);

  function renderToolAsset() {
    switch (activeTool) {
      case 'Elements':
        return <ElementsTool />;
      case 'Images':
        return <ImagesTool />;
      case 'Text':
        return <TextTool />;
      case 'Backgrounds':
        return <BackgroundTool />;
      case 'Layers':
        return <LayerTool />;
      case 'Templates':
        return <TemplatesTool />;
      case 'Draw':
        return <DrawingTool />;
      default:
        return 'Not implemented';
    }
  }

  const handleClose = () => {
    dispatch(switchActiveTool(null));
  };

  return (
    <Panel title={activeTool} placement="left" offset={85} close={handleClose}>
      <Wrap>{renderToolAsset()}</Wrap>
    </Panel>
  );
}

const Wrap = styled.div``;
