import { useAppSelector } from '@/app/hooks';
import ResizeModal from '../ResizeModal';
import DownloadModal from '../DownloadModal';
import { styled } from 'styled-components';
import JSONModal from '../JSONModal';
import Loading from '../excerpt/Loading';

/**
 *
 * This components holds things like modal
 * Basically components that are fixed
 */

export default function Over() {
  const { resizeModal, downloadModal, jsonModal, isLoading } = useAppSelector(
    (state) => state.app
  );
  return (
    <Wrap>
      {resizeModal && <ResizeModal />}
      {downloadModal && <DownloadModal />}
      {jsonModal && <JSONModal />}
      {isLoading && <Loading />}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  z-index: 999998;
`;
