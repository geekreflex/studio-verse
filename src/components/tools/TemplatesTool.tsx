import { useAppDispatch } from '@/app/hooks';
import { useEditorContext } from '@/context/EditorContext';
import templates from '@/data/templates';
import { setDimension } from '@/features/editorSlice';
import { styled } from 'styled-components';

export default function TemplatesTool() {
  const dispatch = useAppDispatch();
  const { editor } = useEditorContext();

  const handleTemplate = (template: any) => {
    if (editor) {
      editor.canvas.clear();
      editor.canvas.loadFromJSON(template.json, () => {
        console.log('loaded');
        editor.resetWorkspace();
        editor.setWorkspaceSize(
          template.dimension.width,
          template.dimension.height
        );
        dispatch(setDimension(template.dimension));
      });
    }
  };

  return (
    <Wrap>
      {templates.map((template, index) => (
        <div
          className="template"
          key={index}
          onClick={() => handleTemplate(template)}
        >
          <div className="template-img-wrap">
            <img src={template.img} />
          </div>
        </div>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;

  .template {
    cursor: pointer;
  }

  .template-img-wrap {
    width: 100%;

    img {
      width: 100%;
    }
  }
`;
