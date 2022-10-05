import * as yup from 'yup';

export default (url, feeds) => {
  const urlToValidate = yup.string().required().url().notOneOf(feeds);
  return urlToValidate.validate(url);
};