import { useState, useEffect } from 'react';
import { searchImages } from 'components/searchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';

let innerHeight = window.innerHeight;

export const App = () => {
  // state = {
  //   searchWord: '',
  //   photo: null,
  //   isLoading: false,
  //   page: 1,
  //   totalPage: 0,
  //   largeImageURL: '',
  // };
  const [searchWord, setSearchWord] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(()=>{
    if (searchWord) {
      setIsLoading(true)
      searchImages(searchWord, page)
          .then(response => response.json())
          .then(photo => {
            if (Object.keys(photo.hits).length === 0) {
              Notiflix.Notify.failure('Sorry, we found nothing at your request');
              return;
            }
            if (page > 1) {
              setPhoto((prev) => [...prev, ...photo.hits])
              if (page > 1) {
                scroll();
              }
              console.log(photo);
            } else {
              setPhoto(photo.hits)
              setTotalPage(photo.totalHits)
              console.log(photo);
            }
          })
          .catch(err => {
            console.log(err);
            Notiflix.Notify.failure('Sorry, something went wrong');
          })
          .finally(() => {
            setIsLoading(false)
          });
    }
  },[searchWord, page])
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.searchWord !== this.state.searchWord ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.setState({isLoading: true});
  //     searchImages(this.state.searchWord, this.state.page)
  //       .then(response => response.json())
  //       .then(photo => {
  //         if (Object.keys(photo.hits).length === 0) {
  //           Notiflix.Notify.failure('Sorry, we found nothing at your request');
  //           return;
  //         }
  //         if (this.state.page > 1) {
  //           this.setState(prev => ({
  //             photo: [...prev.photo, ...photo.hits],
  //           }), () => {
  //             if (this.state.page > 1) {
  //               this.scroll();
  //             }});
  //           console.log(photo);
  //         } else {
  //           this.setState({
  //             photo: photo.hits,
  //             totalPage: photo.totalHits,
  //           });
  //           console.log(photo);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         Notiflix.Notify.failure('Sorry, something went wrong');
  //       })
  //       .finally(() => {
  //         this.setState({isLoading: false});
  //       });
  //   }
  // }

  const onSubmit = (searchWord) => {
    setSearchWord(searchWord)
    setPage(1)
    setPhoto(null)
  };

  const handleSubmit = () => {
    setPage(page + 1)
  };

  const openModal = (e) => {
    // this.setState((prev) =>({largeImageURL: e.target.dataset.source}))
    setLargeImageURL(e.target.dataset.source)
  }

  const closeModal = () => {
    // this.setState((prev) =>({largeImageURL: ''}))
    setLargeImageURL('')
  }

  const scroll = () => {
    innerHeight = innerHeight + window.innerHeight
    window.scrollBy({
      top: innerHeight,
      behavior: "smooth",
    });
  }

    return (
      <div>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery 
          state={{photo, isLoading, page, totalPage, largeImageURL}}
          handleSubmit={handleSubmit}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    );
}
