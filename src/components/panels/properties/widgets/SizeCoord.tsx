import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';
import { useEditorContext } from '@/context/EditorContext';
import { DividerX, Title } from '@/styles/global';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

export default function SizeCoord() {
  const { selectedObjects, editor } = useEditorContext();
  const [width, setWidth] = useState<string>('0');
  const [height, setHeight] = useState<string>('0');
  const [angle, setAngle] = useState<string>('0');
  const [x, setX] = useState<string>('0');
  const [y, setY] = useState<string>('0');

  useEffect(() => {
    const canvas = editor?.canvas;

    if (canvas) {
      canvas.on('object:scaling', handleSizing);
      canvas.on('object:moving', handleMoving);
      canvas.on('object:rotating', handleRotating);
    }
  }, [editor]);

  const handleSizing = (e: fabric.IEvent) => {
    const target = e.target as fabric.Object;
    const newWidth = target.width! * target.scaleX!;
    const newHeight = target.height! * target.scaleY!;
    setWidth(newWidth.toFixed(2).toString());
    setHeight(newHeight.toFixed(2).toString());
  };

  const handleMoving = (e: fabric.IEvent) => {
    const target = e.target as fabric.Object;
    const newX = target.left! * target.scaleX!;
    const newY = target.top! * target.scaleY!;
    setX(newX.toFixed(2).toString());
    setY(newY.toFixed(2).toString());
  };

  const handleRotating = (e: fabric.IEvent) => {
    const target = e.target as fabric.Object;
    const newAngle = target.angle!;
    setAngle(newAngle.toFixed(2).toString());
  };

  useEffect(() => {
    if (selectedObjects) {
      const x = selectedObjects[0].left!;
      const y = selectedObjects[0].top!;

      const w = selectedObjects[0].width!;
      const h = selectedObjects[0].height!;

      const a = selectedObjects[0].angle!;

      setX(x.toFixed(2).toString());
      setY(y.toFixed(2).toString());

      setWidth(w.toFixed(2).toString());
      setHeight(h.toFixed(2).toString());

      setAngle(a.toFixed(2).toString());
    }
  }, [selectedObjects]);

  // useEffect(() => {
  //   if (selectedObjects) {
  //     const obj = selectedObjects[0];
  //     obj.set({
  //       width: Number(width),
  //       height: Number(height),
  //     });
  //   }
  // }, [width, height, angle, x, y]);

  return (
    <SizeCoordWrap>
      <Title>Size & Coords</Title>
      <DividerX />
      <div className="main">
        <div className="size wrap-group">
          <Input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            sin={'W'}
          />
          <Input
            value={height}
            onChange={(e) => setHeight(e.target.height)}
            sin={'H'}
          />
          <div className="lock btn-numb">
            <Icon name="unlockIcon" hover={false} size="small" />
          </div>
        </div>
        <div className="coord wrap-group">
          <Input value={x} onChange={() => {}} sin={'X'} />
          <Input value={y} onChange={() => {}} sin={'Y'} />
          <Input value={angle} onChange={() => {}} sin={'R'} />
        </div>
      </div>
    </SizeCoordWrap>
  );
}

const SizeCoordWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .wrap-group {
    display: flex;
    gap: 10px;
  }

  .btn-numb {
    width: 33%;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.radius.medium};
    font-size: 13px;
    cursor: pointer;
  }
`;