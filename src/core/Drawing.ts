import { fabric } from 'fabric';
import { Editor } from './Editor';
import { Dispatch } from '@reduxjs/toolkit';
import { setDrawingMode } from '@/features/editorSlice';

export class Drawing {
  private canvas: fabric.Canvas;
  private dispatch: Dispatch;

  constructor(editor: Editor, dispatch: Dispatch) {
    this.canvas = editor.canvas;
    this.dispatch = dispatch;
  }

  private vLinePatternBrush() {
    const vLinePatternBrush = new fabric.PatternBrush(this.canvas);
    vLinePatternBrush.getPatternSrc = function () {
      // @ts-expect-error "document"
      const patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      let ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();

      return patternCanvas;
    };
    return vLinePatternBrush;
  }

  public changeBrush(brush: string) {
    if (brush === 'vline') {
      this.canvas.freeDrawingBrush = this.vLinePatternBrush();
    }
  }

  public start() {
    this.canvas.isDrawingMode = true;
    this.dispatch(setDrawingMode(true));
  }

  public end() {
    this.canvas.isDrawingMode = false;
    this.dispatch(setDrawingMode(false));
  }
}
