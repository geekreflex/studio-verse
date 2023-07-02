import { useEffect, useId, useRef, useState } from 'react';
import { styled } from 'styled-components';

interface RangeProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (val: number) => void;
}

export default function Range({ min, max, step, value, onChange }: RangeProps) {
  const ref = useRef(null);
  const [_value, setValue] = useState<number>(value);
  const [progressWidth, setProgressWidth] = useState<string>('');

  useEffect(() => {
    setValue(value);
    updateProgressWidth(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(Number(val));
  };

  const updateProgressWidth = (val: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    setProgressWidth(`${Math.abs(percentage)}%`);
  };

  return (
    <Wrap>
      <div
        className="progress"
        style={{
          width: progressWidth,
        }}
      ></div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={_value}
        ref={ref}
        onChange={handleChange}
        id={useId()}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  input[type='range'] {
    width: 100%;
    height: 10px;
    appearance: none;
    border-radius: ${(props) => props.theme.radius.small};
    background-color: transparent;
    display: flex;
    outline: none;
    border: none;
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: ${(props) => props.theme.radius.small};
    box-shadow: inset rgba(12, 15, 17, 0.8) 0px 1px 2px 0px,
      inset rgba(2, 6, 8, 0.8) 0px 1px 3px 1px;

    &::-webkit-slider-thumb {
      appearance: none;
      height: 18px;
      width: 10px;
      background-color: ${(props) => props.theme.colors.primary};
      border: 1px solid ${(props) => props.theme.colors.borderColor};
      box-shadow: rgba(12, 15, 17, 0.8) 0px 1px 2px 0px,
        rgba(2, 6, 8, 0.8) 0px 1px 3px 1px;
      cursor: pointer;
      border-radius: ${(props) => props.theme.radius.small};
      z-index: 9;
      position: relative;

      &:hover {
        transform: scale(1.4);
        border: 1px solid ${(props) => props.theme.colors.borderColor};
        box-shadow: rgba(12, 15, 17, 0.8) 0px 1px 2px 0px,
          rgba(2, 6, 8, 0.8) 0px 1px 3px 1px;
      }
    }
  }

  .progress {
    height: 10px;
    position: absolute;
    background-color: ${(props) => props.theme.colors.accent};
    z-index: 2;
    left: 0;
    border-radius: ${(props) => props.theme.radius.small};
    pointer-events: none;
  }
`;
