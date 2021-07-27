import axios from 'axios';

const route = {
  BASE_URL: 'https://hrm.3dlifestyle.com.pk/api/app',
};

export default axios.create({
  baseURL: route.BASE_URL,
});
