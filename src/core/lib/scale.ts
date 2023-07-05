import { fabric } from 'fabric';

function getLocalPoint(
  transform: fabric.Transform,
  originX: any,
  originY: any,
  x: number,
  y: number
) {
  let target = transform.target,
    control = target.controls[transform.corner],
    zoom = target.canvas!.getZoom(),
    padding = target.padding! / zoom,
    localPoint = target.toLocalPoint(new fabric.Point(x, y), originX, originY);
  if (localPoint.x >= padding) {
    localPoint.x -= padding;
  }
  if (localPoint.x <= -padding) {
    localPoint.x += padding;
  }
  if (localPoint.y >= padding) {
    localPoint.y -= padding;
  }
  if (localPoint.y <= padding) {
    // current code
    // if (localPoint.y <= -padding) { // expect code
    localPoint.y += padding;
  }
  localPoint.x -= control.offsetX;
  localPoint.y -= control.offsetY;
  return localPoint;
}

export const scaleXOnly = (
  _eventData: Event,
  transform: fabric.Transform,
  x: number,
  y: number
) => {
  const target = transform.target as fabric.Object;
  const localPoint = getLocalPoint(
    transform,
    transform.originX,
    transform.originY,
    x,
    y
  );
  const strokePadding =
    target.strokeWidth! / (target.strokeUniform ? target.scaleX! : 1);
  const newWidth = Math.abs(localPoint.x / target.scaleX!) - strokePadding;
  target.set('width', Math.max(newWidth, 0));
  return true;
};

export const scaleYOnly = (
  _eventData: Event,
  transform: fabric.Transform,
  x: number,
  y: number
) => {
  const target = transform.target as fabric.Object;
  const localPoint = getLocalPoint(
    transform,
    transform.originX,
    transform.originY,
    x,
    y
  );
  const strokePadding =
    target.strokeWidth! / (target.strokeUniform ? target.scaleY! : 1);
  const newHeight = Math.abs(localPoint.y / target.scaleY!) - strokePadding;
  target.set('height', Math.max(newHeight, 0));
  return true;
};
