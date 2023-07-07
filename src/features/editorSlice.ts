import { createSlice } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

interface EditorState {
  currentZoom: number;
  object: (fabric.Object & fabric.Textbox & fabric.Polygon) | null;
  previewImg: string;
  isDrawingMode: boolean;
  dimension: {
    width: number;
    height: number;
  };
}

const initialState: EditorState = {
  currentZoom: 0,
  object: null,
  previewImg: '',
  isDrawingMode: false,
  dimension: {
    width: 1200,
    height: 1200,
  },
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCurrentZoom: (state, action) => {
      const zoom = Number(action.payload);
      state.currentZoom = zoom;
    },
    setObject: (state, action) => {
      state.object = {
        ...state.object,
        ...action.payload,
      };
    },
    clearObject: (state) => {
      state.object = null;
    },

    setPreviewImg: (state, action) => {
      state.previewImg = action.payload;
    },

    setDimension: (state, action) => {
      const { width, height } = state.dimension;

      state.dimension = {
        width: action.payload.width || width,
        height: action.payload.height || height,
      };
    },
    setDrawingMode: (state, action) => {
      state.isDrawingMode = action.payload;
    },
  },
});

export const {
  setCurrentZoom,
  setObject,
  clearObject,
  setPreviewImg,
  setDimension,
  setDrawingMode,
} = editorSlice.actions;
export default editorSlice.reducer;
