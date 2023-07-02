import { createSlice } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

interface EditorState {
  currentZoom: number;
  object: (fabric.Object & fabric.Textbox & fabric.Polygon) | null;
  previewImg: string;
}

const initialState: EditorState = {
  currentZoom: 0,
  object: null,
  previewImg: '',
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
  },
});

export const { setCurrentZoom, setObject, clearObject, setPreviewImg } =
  editorSlice.actions;
export default editorSlice.reducer;
