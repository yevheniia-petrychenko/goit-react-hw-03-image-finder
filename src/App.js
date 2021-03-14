import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Component } from 'react';
import axios from 'axios';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import SearchBar from './components/SearchBar/Searchbar';
import Button from './components/Button/Button';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    imageUrl: '',
    modalStatus: false,
    isLoading: false,
    error: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (this.state.images.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    if (query !== this.state.query) {
      this.setState({
        searchQuery: query,
        currentPage: 1,
        images: [],
        error: false,
      });
    }
    // this.fetchImages(query);
  };

  toggleModal = () => {
    this.setState(({ modalStatus }) => ({
      modalStatus: !modalStatus,
    }));
  };

  fetchImages = query => {
    const { currentPage, searchQuery } = this.state;
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
      isLoading: true,
    }));
    axios
      .get(
        `https://pixabay.com/api/?key=19936293-f4c012c315df51b179ddeb0ea&q=${searchQuery}&per_page=12&page=${currentPage}`,
      )
      .then(response => response.data.hits)
      .then(images => {
        if (images.length > 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  openModal = url => {
    this.setState({
      imageUrl: url,
    });
    this.toggleModal();
  };

  render() {
    const { images, imageUrl, isLoading, modalStatus, error } = this.state;
    return (
      <div className="Container">
        <SearchBar onSubmit={this.onChangeQuery} />
        {error && (
          <h1 className="ErrorMessage">There are no pictures on your query!</h1>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.openModal} />
        )}
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            className="Loader"
          />
        )}
        {images.length >= 12 && !isLoading && (
          <Button onBtnClick={this.fetchImages} />
        )}
        {!!modalStatus && (
          <Modal toggleModal={this.toggleModal}>
            <img src={imageUrl} alt="pic" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
