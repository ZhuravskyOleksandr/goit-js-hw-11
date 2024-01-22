import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery-list');
const loader = document.querySelector('#loader')
searchForm.addEventListener('submit', searchImages);

let lightbox;

function searchImages(event) {
    event.preventDefault();
    galleryList.innerHTML = '';
    loader.classList.add('loader');
    const searchInput = document.querySelector('.search-input');
    
    fetchImages(searchInput.value)
        .then(data => {
            if (data.hits.length === 0) {
                throw new Error('Sorry, there are no images matching your search query. Please try again!');
            }
            galleryList.innerHTML = createMarkup(data.hits);
            lightbox = new SimpleLightbox('.gallery-link', {
            captionsData: 'alt',
            captionDelay: 250,
            }); 
        })
      .catch(err => iziToast.error({
          title: '',
          message: err.message,
          position: 'topRight',
        }))
      .finally(() => {
        searchForm.reset();
        loader.classList.remove('loader');
        lightbox.refresh();
      })
};

function fetchImages(query) {
    const API_KEY = '14812482-32fb1dc9e3056dda489954fb4';
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: 'horizontal',
        safesearch: true,
    });

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }
            return response.json();
    })
};

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
          <li class="gallery-item">
        <div class="img-wrapper">
          <a class="gallery-link" href="${largeImageURL}">
            <img
            class="gallery-img"
            src="${webformatURL}"
            alt="${tags}"
            width="360"
            height="200"
          />
          </a>
        </div>
        <div class="info-wrapper">
          <div class="info-block">
            <h3 class="info-caption">Likes</h3>
            <p class="info-text">${likes}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Views</h3>
            <p class="info-text">${views}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Comments</h3>
            <p class="info-text">${comments}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Downloads</h3>
            <p class="info-text">${downloads}</p>
          </div>
        </div>
      </li>`).join('');
};