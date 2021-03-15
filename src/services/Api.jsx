import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19936293-f4c012c315df51b179ddeb0ea';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const getImages = async ({ q, page }) => {
  return axios
    .get('', { params: { q, page } })
    .then(response => response.data.hits);
};

getImages.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};

export default getImages;
