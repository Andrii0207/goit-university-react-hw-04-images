import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from './service/api/pixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import LoadMoreBTN from './Button/Button';
import Spinner from './Loader/Loader';
import smoothScroll from './service/smoothScroll';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isShowLoadMore: false,
    isShowModal: false,
    isLoading: false,
    error: null,
    modalImg: '',
    textAlt: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== this.state.query || prevState.page !== page) {
      this.setState({ isLoading: true });
      api
        .fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            toast.error(
              'Opps, we have not found any pictures. Try any more...'
            );
            return;
          }
          if (this.state.page === 1) {
            toast.success(`Horrey! We found ${totalHits} pictures`);
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            isShowLoadMore: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleOpenModal = ({ modalImg, textAlt }) => {
    this.setState({
      isShowModal: true,
      modalImg,
      textAlt,
    });
  };

  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImg: '', textAlt: '' });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    if (!this.state.images) {
      return;
    }
    smoothScroll();
  };

  handleFormSubmit = query => {
    if (query === '') {
      this.setState({ images: [], isShowLoadMore: false });
      return;
    }
    this.setState({
      query,
      images: [],
      page: 1,
      isShowLoadMore: false,
    });
  };

  render() {
    const { isShowLoadMore, isLoading, isShowModal, modalImg, textAlt } =
      this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          imageList={this.state.images}
          openModal={this.handleOpenModal}
        />
        {isShowLoadMore && <LoadMoreBTN onClick={this.handleLoadMore} />}
        {isLoading && <Spinner />}
        {isShowModal && (
          <Modal
            onCloseModal={this.handleCloseModal}
            modalImg={modalImg}
            tag={textAlt}
          />
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    );
  }
}
