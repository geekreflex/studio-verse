import useEventListener from './useEventListener';

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  cb: (e: Event) => void
) {
  useEventListener(
    'click',
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cb(e);
      }
    },
    document
  );
}
