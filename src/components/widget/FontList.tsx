import { styled } from 'styled-components';
import Draggable from '../common/Draggable';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setLoading } from '@/features/fontsSlice';
import SearchInput from '../common/SearchInput';
import { useEditorContext } from '@/context/EditorContext';
import WebFont from 'webfontloader';
import FontListSkeleton from '../skeleton/FontListSkeleton';
import { setObject } from '@/features/editorSlice';

interface FontListProps {
  close: () => void;
}

export default function FontList({ close }: FontListProps) {
  const dispatch = useAppDispatch();
  const { controller, selectedObject } = useEditorContext();
  const { fonts, status } = useAppSelector((state) => state.fonts);
  const [visibleFonts, setVisibleFonts] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const pageSize = 100;

  const loadMoreFonts = () => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const nextFonts = fonts.slice(startIndex, endIndex);

    const fontFamilies = nextFonts.map((font) => font.family);
    dispatch(setLoading('loading'));

    WebFont.load({
      google: {
        families: fontFamilies,
      },
      active: () => {
        setVisibleFonts((prevFonts) => [...prevFonts, ...fontFamilies]);
        dispatch(setLoading('idle'));
        setPage((prevPage) => prevPage + 1);
      },
    });
  };

  useEffect(() => {
    loadMoreFonts();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visibleFonts, status]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;

      if (scrollHeight - scrollTop === clientHeight && status !== 'loading') {
        loadMoreFonts();
      }
    }
  };

  const handleFont = (family: string) => {
    if (controller) {
      controller.fontFamily(family);
      dispatch(setObject({ fontFamily: family }));
    }
  };

  return (
    <Draggable title="Font list" close={close}>
      <Wrap>
        <div className="font-list-top">
          <SearchInput
            query={'font'}
            placeholder="Search Fonts"
            onChange={() => {}}
          />
        </div>

        <div className="fonts-wrap" ref={containerRef}>
          <ul>
            {visibleFonts.map((font, index) => (
              <li
                key={index}
                style={{ fontFamily: font }}
                onClick={() => handleFont(font)}
              >
                {font}
              </li>
            ))}
          </ul>
          {status === 'loading' && <FontListSkeleton />}
        </div>
      </Wrap>
    </Draggable>
  );
}

const Wrap = styled.div`
  width: 250px;
  min-height: 400px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;

  .font-list-top {
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .fonts-wrap {
    overflow-y: auto;
    flex: 1;
    height: 100%;

    ul,
    li {
      list-style: none;

      li {
        padding: 3px 10px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.colors.hoverColor};
        }
      }
    }
  }
`;
