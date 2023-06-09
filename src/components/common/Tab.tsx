import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface TabProps {
  tabs: { name: string }[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

/**
 *
 * Don't forget to use iPhone tab style
 */

export default function Tab({ tabs, activeTab, setActiveTab }: TabProps) {
  const [gliderWidth, setGliderWidth] = useState(0);
  const [gliderOffset, setGliderOffset] = useState(0);
  const gliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gliderRef.current) {
      return;
    }

    const activeTabElement = gliderRef.current.querySelector(
      '.active'
    ) as HTMLElement | null;
    if (activeTabElement) {
      const offsetLeft = activeTabElement.offsetLeft;
      const width = activeTabElement.offsetWidth;
      setGliderOffset(offsetLeft);
      setGliderWidth(width);
    }
  }, [activeTab]);

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Wrap>
      <div className="tablist" ref={gliderRef}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={tab.name === activeTab ? 'active tab' : 'tab'}
            onClick={() => onTabClick(tab.name)}
          >
            {tab.name}
          </div>
        ))}
        <div
          className="glider"
          style={{
            transform: `translateX(${gliderOffset}px)`,
            width: `${gliderWidth}px`,
          }}
        ></div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 4px;
  border-radius: ${(props) => props.theme.radius.medium};
  border: 1px solid ${(props) => props.theme.colors.borderColor};

  .tablist {
    display: flex;
    position: relative;

    .tab {
      flex: 1;
      padding: 5px 10px;
      border-radius: ${(props) => props.theme.radius.medium};
      cursor: pointer;
      font-size: 12px;
      position: relative;
      z-index: 9;
      font-weight: 600;
    }

    .glider {
      position: absolute;
      bottom: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colors.primary};
      border-radius: ${(props) => props.theme.radius.small};
      transition: transform 0.3s ease;
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid ${(props) => props.theme.colors.borderColor};
    }
  }
`;
