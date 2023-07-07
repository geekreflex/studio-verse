import { fabric } from 'fabric';
import { Editor } from './Editor';
import { Dispatch } from '@reduxjs/toolkit';
import { setDrawingMode } from '@/features/editorSlice';

export class Drawing {
  private editor: Editor;
  private canvas: fabric.Canvas;
  private dispatch: Dispatch;

  constructor(editor: Editor, dispatch: Dispatch) {
    this.editor = editor;
    this.canvas = editor.canvas;
    this.dispatch = dispatch;
  }

  initDrawing() {
    this.canvas.isDrawingMode = true;
  }

  public start() {
    this.initDrawing();
    this.dispatch(setDrawingMode(true));
  }

  public end() {
    this.canvas.isDrawingMode = false;
    this.dispatch(setDrawingMode(false));
  }
}
