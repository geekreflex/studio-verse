import Editor from '@/components/Editor';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Editor />,
  },
]);
