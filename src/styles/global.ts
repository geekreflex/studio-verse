import { createGlobalStyle, styled } from 'styled-components';

export default createGlobalStyle`
  body {
    color: ${(props) => props.theme.colors.textColor};
  }

  /* For Webkit based browsers (Chrome, Safari, Opera) */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* ::-webkit-scrollbar-track {
    background: #f1f1f1;
  } */

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.scrollbarThumbColor};
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  .btn-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .btn-text-arrow {
    width: 100%;
    background-color: transparent;
    color: ${(props) => props.theme.colors.textColor};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    height: ${(props) => props.theme.resets.btnInputHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: ${(props) => props.theme.radius.small};
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverColor};
    }
  }

  .iconn {
    width: ${(props) => props.theme.resets.btnInputHeight};
    height: ${(props) => props.theme.resets.btnInputHeight};
    background-color: transparent;
    border: none;
    outline: none;
    color: ${(props) => props.theme.colors.textColor};
    font-size: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.radius.small};
    border: 1px solid transparent;
    transition: all 200ms;
   

    &:hover {
      background-color: ${(props) => props.theme.colors.hoverColor};
    border: 1px solid ${(props) => props.theme.colors.borderColor};

    }
  }

  .icon-sm {
    font-size: 18px;
  }

  .icon-active {
    background-color: ${(props) => props.theme.colors.hoverActiveColor};
  }

  .arrow {
    display: flex;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.colors.textColor};
   

    path {
      stroke-width: 4px !important;
    }
  }

  .stroke2 {
    path {
      stroke-width: 2px;
    }
  }

  .prop-wrap {
    display: flex;
    flex-direction: column;
    h4 {
      font-size: 12px;
      font-weight: 600;
    }
  }

  .input-number-range-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
  
    h4 {
      font-size: 12px;
    }
  
    .number-wrap {
      width: 50%;
    }
  }


`;

export const LineX = styled.div<{ margin?: number }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.borderColor};
  margin: ${(props) =>
    props.margin?.toString() ? `${props.margin}px 0` : `10px 0`};
`;

export const LineY = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.borderColor};
  margin: 0 10px;
`;

export const TitleSmall = styled.h5`
  margin: 10px;
  font-weight: 400;
`;

export const GridItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 5px;
  border-radius: ${(props) => props.theme.radius.medium};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.hoverColor};
  }

  p {
    font-size: 12px;
    font-weight: 600;
  }
`;

export const Button = styled.button`
  padding: 0 20px;
  height: 35px;
  border-radius: ${(props) => props.theme.radius.small};
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.textColor};
  border: 1px solid transparent;
  transition: all 300ms;
  &:hover {
    background-color: ${(props) => props.theme.colors.accent}80;
    border-color: transparent;
  }

  #btn-icon {
    font-size: 20px;
  }

  #btn-text {
    font-size: 14px;
    font-weight: 600;
  }

  span {
    display: flex;
  }

  .arr-icon {
    svg,
    path {
      stroke-width: 4px;
    }
  }
`;

export const ButtonSecondary = styled(Button)`
  background-color: #292929;
  &:hover {
    background-color: #191919;
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToolWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;
