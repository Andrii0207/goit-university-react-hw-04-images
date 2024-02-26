import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import * as api from './service/api/pixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import LoadMoreBTN from './Button/Button';
import Spinner from './Loader/Loader';
// import smoothScroll from './service/smoothScroll';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState('');
  const [textAlt, setTextAlt] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    api
      .fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Opps, we have not found any pictures. Try any more...');
          return;
        }

        if (page === 1) {
          toast.success(`Horrey! We found ${totalHits} pictures`);
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setIsShowLoadMore(page < Math.ceil(totalHits / 12) ? true : false);
      })
      .catch(error => setError(error))
      .finally(setIsLoading(false));
  }, [query, page]);

  const handleOpenModal = ({ modalImg, textAlt }) => {
    setIsShowModal(true);
    setModalImg(modalImg);
    setTextAlt(textAlt);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    setModalImg('');
    setTextAlt('');
  };

  const handleLoadMore = () => {
    setPage(() => page + 1);
    // smoothScroll();
  };

  const handleFormSubmit = query => {
    if (query === '') {
      setImages([]);
      setIsShowLoadMore(false);
      return;
    }
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsShowLoadMore(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageList={images} openModal={handleOpenModal} />
      {isShowLoadMore && <LoadMoreBTN onClick={handleLoadMore} />}
      {isLoading && <Spinner />}
      {isShowModal && (
        <Modal
          onCloseModal={handleCloseModal}
          modalImg={modalImg}
          tag={textAlt}
        />
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
