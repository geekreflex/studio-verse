import { styled } from 'styled-components';
import ElementsTool from './ElementsTool';
import { useAppSelector } from '@/app/hooks';
import ImagesTool from './ImagesTools';
import TextTool from './TextTool';
import BackgroundsTool from './BackgroundsTool';
import DrawTool from './DrawTool';
import TemplatesTool from './TemplatesTool';
import { useEditorContext } from '@/context/EditorContext';

export default function ToolsPanel() {
  const { activeTool } = useAppSelector((state) => state.app);
  const { tool } = useEditorContext();

  if (!tool) {
    return null;
  }

  return (
    <Wrap>
      {activeTool === 'elements' && <ElementsTool tool={tool} />}
      {activeTool === 'images' && <ImagesTool />}
      {activeTool === 'text' && <TextTool />}
      {activeTool === 'templates' && <TemplatesTool />}
      {activeTool === 'draw' && <DrawTool />}
      {activeTool === 'backgrounds' && <BackgroundsTool />}
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100%;
`;