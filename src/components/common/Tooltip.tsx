import { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { styled } from 'styled-components';

interface TooltipProps {
  content: string;
  placement?: string | any;
  children: React.ReactElement;
}

export default function Tooltip({
  content,
  placement = 'top',
  children,
}: TooltipProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: document.body,
        },
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
    ],
  });

  return (
    <Wrap>
      <div
        ref={setReferenceElement}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {tooltipVisible && (
        <div
          ref={setPopperElement}
          className="main-tooltip"
          style={{ ...styles.popper }}
          {...attributes.popper}
        >
          {content}
          <div
            ref={setArrowElement}
            className="tooltip-arrow"
            style={{ ...styles.arrow }}
            {...attributes.arrow}
          ></div>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  flex: auto;

  .main-tooltip {
    padding: 6px 10px;
    border-radius: ${(props) => props.theme.radius.small};
    font-size: 12px;
    z-index: 9999;
    background-color: ${(props) => props.theme.colors.hoverActiveColor};
    color: ${(props) => props.theme.colors.textColor};
    width: max-content;
    max-width: 300px;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
  }

  .tooltip-arrow {
    /* Todo */
  }
`;
