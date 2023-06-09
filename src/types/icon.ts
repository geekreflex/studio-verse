export interface IIcon {
  size?: 'small' | 'medium' | 'big';
  name: IconName;
  color?: string;
  disabled?: boolean;
  hover?: boolean;
  label?: string | null;
  click?: () => void;
}

export type IconName =
  | 'grid1Icon'
  | 'zoomInIcon'
  | 'zoomOutIcon'
  | 'bgIcon'
  | 'grid3Icon'
  | 'textIcon'
  | 'shapesIcon'
  | 'imageIcon'
  | 'closeIcon'
  | 'close2Icon'
  | 'lockIcon'
  | 'unlockIcon'
  | 'undoIcon'
  | 'redoIcon'
  | 'trashIcon'
  | 'copyIcon'
  | 'alignLeftIcon'
  | 'alignBottomIcon'
  | 'alignTopIcon'
  | 'alignRightIcon'
  | 'alignHorizontalIcon'
  | 'alignVerticalIcon'
  | 'brushIcon'
  | 'brush2Icon'
  | 'positionIcon'
  | 'shadowIcon'
  | 'layerIcon'
  | 'arrowSwapXIcon'
  | 'arrowSwapYIcon'
  | 'arrowUpIcon'
  | 'arrowDownIcon'
  | 'settingsIcon'
  | 'addImageIcon'
  | 'rotateLeftIcon'
  | 'rotateRightIcon'
  | 'backwardIcon'
  | 'forwardIcon'
  | 'bringFrontIcon'
  | 'sendBackIcon';
