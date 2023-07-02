import { useAppDispatch } from '@/app/hooks';
import { useEditorContext } from '@/context/EditorContext';
import templates from '@/data/templates';
import { setIsLoading } from '@/features/appSlice';
import { setDimension } from '@/features/editorSlice';
import { extractFontFamiliesFromJson } from '@/utils/array';
import { styled } from 'styled-components';
import WebFont from 'webfontloader';

export default function TemplatesTool() {
  const dispatch = useAppDispatch();
  const { editor } = useEditorContext();

  const handleTemplate = (template: any) => {
    dispatch(setIsLoading(true));
    if (editor) {
      editor.canvas.clear();
      editor.canvas.clearHistory();

      WebFont.load({
        google: {
          families: extractFontFamiliesFromJson(JSON.stringify(template.json)),
        },

        active: () => {
          editor.canvas.loadFromJSON(template.json, () => {
            editor.resetWorkspace();
            editor.canvas.clearHistory();

            editor.setWorkspaceSize(
              template.dimension.width,
              template.dimension.height
            );
            dispatch(setIsLoading(false));
            dispatch(setDimension(template.dimension));
          });
        },
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
