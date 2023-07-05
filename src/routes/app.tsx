import Editor from '@/components/Editor';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: 'Hello',
  },
  {
    path: '/editor/new',
    element: <Editor />,
  },
]);
