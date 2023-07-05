import { Dispatch } from '@reduxjs/toolkit';
import { Editor } from './Editor';
import FontFaceObserver from 'fontfaceobserver';
import { switchPropertyPanel } from '@/features/appSlice';

export class Controller {
  editor: Editor;
  private dispatch: Dispatch;

  constructor(editor: Editor, dispatch: Dispatch) {
    this.editor = editor;
    this.dispatch = dispatch;
  }

  public flipX() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject && activeObject.flipX) {
      activeObject.toggle('flipX');
    }
    this.editor.canvas.renderAll();
  }

  public flipY() {
    const activeObject = this.editor.canvas.getActiveObject();
    console.log('clicked');
    if (activeObject) {
      activeObject.toggle('flipY');
    }
    this.editor.canvas.renderAll();
  }

  public rotate(angleOffset: number) {
    const activeObject = this.editor.canvas.getActiveObject();

    if (!activeObject) return;

    let angle = activeObject.get('angle')! + angleOffset;
    angle = angle > 360 ? 90 : angle < 0 ? 270 : angle;

    activeObject.rotate(angle).setCoords();
    activeObject.set('angle', angle).setCoords();
    this.editor.canvas.renderAll();
  }

  public delete() {
    const objects = this.editor.canvas.getActiveObjects();
    objects.map((obj) => {
      this.editor.canvas.remove(obj);
      this.editor.canvas.getActiveObject();
    });
    this.editor.canvas.discardActiveObject().renderAll();
    this.editor.canvas.renderAll();
  }

  public duplicate() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((clone: fabric.Object) => {
        this.editor.canvas.add(
          clone.set({
            left: activeObject.left! + 10,
            top: activeObject.top! + 10,
          })
        );
      });
    }
  }

  public lock() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject) {
      activeObject.lockMovementX = true;
      activeObject.lockMovementY = true;
      activeObject.lockRotation = true;
      activeObject.selectable = false;
    }
    this.editor.canvas.renderAll();
  }

  public group() {
    const selectedObject = this.editor.canvas.getActiveObject();
    if (selectedObject?.type !== 'activeSelection') {
      return;
    }
    // @ts-expect-error toGroup not shipped with types
    selectedObject?.toGroup();
    this.editor.canvas.requestRenderAll();
  }

  public ungroup() {
    const selectedObject = this.editor.canvas.getActiveObject();
    if (selectedObject?.type !== 'group') {
      return;
    }
    // @ts-expect-error toActiveSelection not shipped with types
    selectedObject?.toActiveSelection();
    this.editor.canvas.requestRenderAll();
    this.dispatch(switchPropertyPanel('activeSelection'));
  }

  public order(action: string) {
    const object = this.editor.canvas.getActiveObject();
    const objectIndex = this.editor.canvas.getObjects().indexOf(object!);

    switch (action) {
      case 'front':
        object?.bringToFront();
        break;
      case 'back':
        this.editor.canvas.moveTo(object!, 1);
        break;
      case 'forward':
        object?.bringForward();
        break;
      case 'backward':
        if (objectIndex === 1) {
          return;
        }
        object?.sendBackwards();
        break;
      default:
        break;
    }

    this.editor.canvas.renderAll();
  }

  public align(position: string) {
    const activeObject = this.editor.canvas.getActiveObject();

    if (activeObject && activeObject.type === 'activeSelection') {
      const activeSelection = activeObject as fabric.ActiveSelection;

      switch (position) {
        case 'left':
          const activeSelectionLeft = -(activeSelection.width! / 2);
          activeSelection.forEachObject((item) => {
            item.set({
              left: activeSelectionLeft,
            });
            item.setCoords();
          });

          break;
        case 'right':
          const activeSelectionRight = activeSelection.width! / 2;
          activeSelection.forEachObject((item) => {
            item.set({
              left:
                activeSelectionRight -
                (item.width! + item.strokeWidth!) * item.scaleX!,
            });
            item.setCoords();
          });
          break;
        case 'top':
          const activeSelectionTop = -activeSelection.height! / 2;
          activeSelection.forEachObject((item) => {
            item.set({
              top: activeSelectionTop,
            });
            item.setCoords();
          });
          break;
        case 'bottom':
          const activeSelectionBottom = activeSelection.height! / 2;
          activeSelection.forEachObject((item) => {
            item.set({
              top:
                activeSelectionBottom -
                (item.height! + item.strokeWidth!) * item.scaleY!,
            });
            item.setCoords();
          });
          break;
        case 'horizontal':
          activeSelection.forEachObject((item) => {
            item.set({
              left: 0 - (item.width! * item.scaleX!) / 2,
            });
            item.setCoords();
          });
          break;
        case 'vertical':
          activeSelection.forEachObject((item) => {
            item.set({
              top: 0 - (item.width! * item.scaleY!) / 2,
            });
            item.setCoords();
          });
          break;
      }
    } else if (activeObject) {
      const workspaceWidth = this.editor.workspace?.width!;
      const workspaceHeight = this.editor.workspace?.height!;
      const activeObjectStrokeWidth = activeObject.strokeWidth!;

      switch (position) {
        case 'left':
          activeObject.set({
            left: 0,
          });
          break;
        case 'right':
          activeObject.set({
            left:
              workspaceWidth -
              activeObject.width! * activeObject.scaleX! -
              activeObjectStrokeWidth,
          });
          break;
        case 'top':
          activeObject.set({
            top: 0,
          });
          activeObject.setCoords();
          break;
        case 'bottom':
          activeObject.set({
            top:
              workspaceHeight -
              activeObject.height! * activeObject.scaleY! -
              activeObjectStrokeWidth,
          });
          activeObject.setCoords();
          break;
        case 'horizontal':
          activeObject.set({
            left:
              (workspaceWidth -
                activeObject.width! * activeObject.scaleX! -
                activeObjectStrokeWidth) /
              2,
          });
          break;
        case 'vertical':
          activeObject.set({
            top:
              (workspaceHeight -
                activeObject.height! * activeObject.scaleY! -
                activeObjectStrokeWidth) /
              2,
          });
      }
    }
    this.editor.canvas.renderAll();
  }

  public textAlign(alignment: string) {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      activeObject.set({ textAlign: alignment });
    }
    this.editor.canvas.renderAll();
  }

  public fontWeight() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      const isBold = activeObject.fontWeight === 'bold';
      activeObject.set('fontWeight', isBold ? 'normal' : 'bold');
    }
    this.editor.canvas.renderAll();
  }

  public fontStyle() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      const isItalic = activeObject.fontStyle === 'italic';
      activeObject.set('fontStyle', isItalic ? 'normal' : 'italic');
    }
    this.editor.canvas.renderAll();
  }

  public underline() {
    const activeObject = this.editor.canvas.getActiveObject();
    if (activeObject instanceof fabric.Textbox) {
      const isUnderlined = activeObject.underline;
      activeObject.set('underline', !isUnderlined);
    }
    this.editor.canvas.renderAll();
  }

  public fontSize(size: number) {
    const activeObject = this.editor.canvas.getActiveObject();

    if (activeObject instanceof fabric.Textbox) {
      activeObject.set({ fontSize: size });
    }
    this.editor.canvas.renderAll();
  }

  public fontFamily(name: string) {
    const activeObject = this.editor.canvas.getActiveObject();
    const font = new FontFaceObserver(name);
    const ed = this.editor.canvas;

    if (activeObject instanceof fabric.Textbox) {
      // Update code to check if font is system font
      // else load custom fonts with FonFaceObserver
      if (name === 'ubuntu') {
        activeObject.set({ fontFamily: name });
      } else {
        font
          .load()
          .then(function () {
            activeObject.set({ fontFamily: name });
            ed.renderAll();
          })
          .catch((err) => {
            console.error('Font failed', err);
          });
      }
    }
    this.editor.canvas.renderAll();
  }
}
