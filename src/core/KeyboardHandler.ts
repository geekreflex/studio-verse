import { Controller } from './Controller';
import { Editor } from './Editor';
import { setCurrentZoom } from '@/features/editorSlice';
import { Dispatch } from '@reduxjs/toolkit';

export class KeyboardHandler {
  private editor: Editor;
  private canvas: fabric.Canvas;
  private dispatch: Dispatch;
  private controller: Controller;
  private isCtrlKeyPressed: boolean;

  constructor(editor: Editor, dispatch: Dispatch) {
    this.editor = editor;
    this.canvas = editor.canvas;
    this.dispatch = dispatch;
    this.controller = new Controller(editor, dispatch);
    this.isCtrlKeyPressed = false;
    this.attachEventListeners();
  }

  private attachEventListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Control') {
      event.preventDefault();
      this.isCtrlKeyPressed = true;
    } else {
      switch (event.key) {
        case '=':
          if (this.isCtrlKeyPressed) {
            event.preventDefault();
          }
          this.zoomIn();
          break;
        case '-':
          if (this.isCtrlKeyPressed) {
            event.preventDefault();
          }
          this.zoomOut();
          break;
        case ')':
          this.zoom100();
          break;
        case 'Delete':
        case 'Backspace':
          this.deleteSelectedObject();
          break;
        default:
          return;
      }
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Control') {
      this.isCtrlKeyPressed = false;
    }
  };

  private zoomIn() {
    if (this.isCtrlKeyPressed) {
    }
    this.editor.zoomIn();
    this.handleUpdateZoom();
  }

  private zoomOut() {
    if (this.isCtrlKeyPressed) {
    }
    this.editor.zoomOut();
    this.handleUpdateZoom();
  }

  private deleteSelectedObject() {
    const obj = this.canvas.getActiveObject() as fabric.Textbox;

    if (obj?.type === 'textbox') {
      obj.text = '';
      this.canvas.renderAll();
    } else {
      this.controller.delete();
    }
  }

  private zoom100() {
    this.editor.setZoomAuto(1);
  }

  private handleUpdateZoom() {
    const zoom = this.canvas.getZoom();
    this.dispatch(setCurrentZoom(zoom * 100));
  }
}
