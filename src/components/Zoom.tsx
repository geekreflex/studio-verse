import { ArrowDownIcon } from '@/icons';
import { useState } from 'react';
import { styled } from 'styled-components';

export default function Zoom() {
  const [visible, setVisible] = useState(false);
  return (
    <Wrap>
      <div className="zoom-level-view" onClick={() => setVisible(!visible)}>
        <span id="zoom-level">{120}%</span>
        <span id="zoom-arr">
          <ArrowDownIcon />
        </span>
      </div>
      {visible && (
        <div className="zoom-list-wrap">
          <ul className="zoom-list">
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom In</span>
                <span id="zoom-key">Ctrl+ =</span>
              </div>
            </li>
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom Out</span>
                <span id="zoom-key">Ctrl+ –</span>
              </div>
            </li>
            <li>
              <div className="separator"></div>
            </li>
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom to 100%</span>
                <span id="zoom-key">Shift+ 0</span>
              </div>
            </li>
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom to Fit</span>
                <span id="zoom-key">Shift+ 1</span>
              </div>
            </li>
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom to Width</span>
                <span id="zoom-key">Shift+ 2</span>
              </div>
            </li>
            <li>
              <div className="inner">
                <span id="zoom-text">Zoom to Selection</span>
                <span id="zoom-key">Shift+ 3</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  .zoom-level-view {
    display: flex;
    background-color: ${(props) => props.theme.colors.panelBg};
    padding: 10px;
    border-radius: ${(props) => props.theme.radius.small};
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 60px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.hoverColor};
    }
  }

  span {
    display: flex;
  }

  #zoom-level {
    font-size: 12px;
    font-weight: 600;
  }

  #zoom-arr {
    font-size: 9px;
    path {
      stroke-width: 4px;
    }
  }

  .separator {
    width: 100%;
    height: 1px;
    background-color: #333;
    margin: 6px 0;
  }

  .zoom-list-wrap {
    width: 250px;
    position: absolute;
    bottom: 50px;
    background-color: ${(props) => props.theme.colors.panelBg};
    padding: 6px 0;
    border-radius: ${(props) => props.theme.radius.medium};

    .zoom-list {
      list-style: none;
      display: flex;
      flex-direction: column;

      li {
        font-size: 13px;
        font-weight: 400;

        #zoom-key {
          color: #777;
        }

        .inner {
          display: flex;
          padding: 7px 15px;
          margin: 0 5px;
          cursor: pointer;
          border-radius: ${(props) => props.theme.radius.small};
          justify-content: space-between;
          align-items: center;
          &:hover {
            background-color: #09f;
            #zoom-key {
              color: #fff;
            }
          }
        }
      }
    }
  }
`;
