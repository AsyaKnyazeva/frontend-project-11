import * as yup from 'yup';

export default (url, feeds) => {
  yup.setLocale({
    string: {
      url: 'form.errors.urlInvalid',
    },
    mixed: {
      required: 'form.errors.urlRequired',
      notOneOf: 'form.errors.urlDuplicate',
    }
  })
  const urlToValidate = yup
    .string()
    .required()
    .url()
    .notOneOf(feeds);
  return urlToValidate.validate(url);
};