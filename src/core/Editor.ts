import { fabric } from 'fabric';
import { throttle } from 'lodash-es';
import { AlignGuidelines } from './guideline/AligningGuidlines';

declare type EditorOption = { width: number; height: number };
declare type ExtCanvas = fabric.Canvas & {
  isDragging: boolean;
  lastPosX: number;
  lastPostY: number;
};

export class Editor {
  canvas: fabric.Canvas;
  workspaceEl: HTMLElement;
  workspace: fabric.Rect | null;
  option: EditorOption;
  dragMode: boolean;
  defaultZoom: number;
  private resizeObserver: ResizeObserver | null;

  constructor(
    canvas: fabric.Canvas,
    workspaceEl: HTMLElement,
    option: EditorOption
  ) {
    this.canvas = canvas;
    this.workspaceEl = workspaceEl;
    this.workspace = null;
    this.option = option;
    this.dragMode = false;
    this.defaultZoom = 1;
    this.resizeObserver = null;

    this.initBackground();
    this.initWorkspace();
    this.initResizeObserve();
    this.initDing();
    this.initAligningGuidlines();
  }

  private initBackground() {
    this.canvas.setBackgroundColor(
      '#888',
      this.canvas.renderAll.bind(this.canvas)
    );
    this.canvas.backgroundImage = '';
    this.canvas.setWidth(this.workspaceEl.offsetWidth);
    this.canvas.setHeight(this.workspaceEl.offsetHeight);
  }

  private initWorkspace() {
    const { width, height } = this.option;
    const workspace = new fabric.Rect({
      fill: '#ffffff',
      width,
      height,
      id: 'workspace',
    });
    workspace.set('selectable', false);
    workspace.set('hasControls', false);
    workspace.hoverCursor = 'default';
    this.canvas.add(workspace);
    this.canvas.renderAll();

    this.workspace = workspace;
    this.auto();
  }

  private initAligningGuidlines() {
    const guideline = new AlignGuidelines({ canvas: this.canvas });
    guideline.init();
  }

  private setCenterFromObject(obj: fabric.Rect) {
    const { canvas } = this;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;
    viewportTransform[4] =
      canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }

  private initResizeObserve() {
    this.resizeObserver = new ResizeObserver(
      throttle(() => {
        this.auto();
      }, 50)
    );
    this.resizeObserver.observe(this.workspaceEl);
  }

  public setSize(width: number, height: number) {
    this.initBackground();
    this.option.width = width;
    this.option.height = height;
    this.workspace = this.canvas
      .getObjects()
      .find((item) => item.id === 'workspace') as fabric.Rect;
    this.workspace.set('width', width);
    this.workspace.set('height', height);
    this.auto();
  }

  public setZoomAuto(
    scale: number,
    cb?: (left?: number, top?: number) => void
  ) {
    const { workspaceEl } = this;
    const width = workspaceEl.offsetWidth;
    const height = workspaceEl.offsetHeight;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform(fabric.iMatrix.concat());
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
    if (!this.workspace) return;
    this.setCenterFromObject(this.workspace);

    this.workspace.clone((cloned: fabric.Rect) => {
      this.canvas.clipPath = cloned;
      this.canvas.requestRenderAll();
    });
    if (cb) cb(this.workspace.left, this.workspace.top);
  }

  zoomIn() {
    const zoomFactor = 1.1; // Adjust the zoom factor as needed
    const zoom = this.canvas.getZoom() * zoomFactor;
    this.setZoomAuto(zoom);
  }

  zoomOut() {
    const zoomFactor = 0.9; // Adjust the zoom factor as needed
    const zoom = this.canvas.getZoom() * zoomFactor;
    this.setZoomAuto(zoom);
  }

  getScale() {
    const viewPortWidth = this.workspaceEl.offsetWidth;
    const viewPortHeight = this.workspaceEl.offsetHeight;
    if (
      viewPortWidth / viewPortHeight <
      this.option.width / this.option.height
    ) {
      return viewPortWidth / this.option.width;
    }
    return viewPortHeight / this.option.height;
  }

  private auto() {
    const scale = this.getScale();
    // I want to maintain the size of the canvas
    // I don't want to to auto zoom-in when resizing.
    this.setZoomAuto(Math.min(scale - 0.08, 1));
  }

  /**
   * Toggle on for move workspace
   */
  startDing() {
    this.dragMode = true;
    this.canvas.defaultCursor = 'grab';
  }

  /**
   * Toggle off for move workspace
   */
  endDing() {
    this.dragMode = false;
    this.canvas.defaultCursor = 'default';
  }

  initDing() {
    const This = this;
    this.canvas.on('mouse:down', function (this: ExtCanvas, opt) {
      const evt = opt.e;
      if (evt.altKey || This.dragMode) {
        This.canvas.defaultCursor = 'grabbing';
        This.canvas.discardActiveObject();
        This.setDing();
        this.selection = false;
        this.isDragging = true;
        this.lastPosX = evt.clientX;
        this.lastPostY = evt.clientY;
        this.requestRenderAll();
      }
    });

    this.canvas.on('mouse:move', function (this: ExtCanvas, opt) {
      if (this.isDragging) {
        This.canvas.discardActiveObject();
        This.canvas.defaultCursor = 'grabbing';
        const { e } = opt;
        if (!this.viewportTransform) return;
        const vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPostY;
        this.lastPosX = e.clientX;
        this.lastPostY = e.clientY;
        this.requestRenderAll();
      }
    });

    this.canvas.on('mouse:up', function (this: ExtCanvas) {
      if (!this.viewportTransform) return;
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
      this.getObjects().forEach((obj) => {
        if (obj.id !== 'workspace' && obj.hasControls) {
          obj.selectable = true;
        }
      });
      this.requestRenderAll();
      This.canvas.defaultCursor = 'default';
    });

    /**
     * Zoom in or out with mouse wheel
     *
     */
    this.canvas.on('mouse:wheel', function (this: fabric.Canvas, opt) {
      const delta = opt.e.deltaY;
      let zoom = this.getZoom();
      zoom *= 0.99 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      const center = this.getCenter();
      this.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  setDing() {
    this.canvas.selection = false;
    this.canvas.defaultCursor = 'grab';
    this.canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
    });
    this.canvas.renderAll();
    this.canvas.requestRenderAll();
  }

  public styleSelectionHandles({}) {}

  public dispose() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.canvas) {
      this.canvas.dispose();
    }
  }
}
