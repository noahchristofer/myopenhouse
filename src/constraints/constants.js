const GOOGLE_API_KEY = 'AIzaSyD3HvvqZvQ20fISiVnxW9qWCKX5OZAKnRs';
const imageLink = 'https://7tracking.com/openhouse/images/';
const alertType =
  'You are not allowed to perform this function. Register yourself first as a seller/buyer.';

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  GOOGLE_API_KEY,
  regEmail,
  imageLink,
  alertType,
};
