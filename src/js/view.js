import onChange from 'on-change';
import _ from 'lodash';

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'sent':
      elements.submitButton.disabled = false;
      break;

    case 'error':

      break;

    case 'sending':
      elements.submitButton.disabled = true;
      break;

    case 'filling':
      elements.submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const handleFormValid = (elements, i18n, value) => {
  if (value === true) {
    elements.feedback.textContent = i18n.t('form.urlValid');
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
  }
  elements.form.reset();
  elements.form.focus();
};

const handleErrors = (elements, i18n, value) => {
  elements.submitButton.disabled = false;
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
  switch (value) {
    case 'notOneOf':
      elements.feedback.textContent = i18n.t('form.errors.urlDuplicate');
      break;

    case 'url':
      elements.feedback.textContent = i18n.t('form.errors.urlInvalid');
      break;

    case 'rssParser':
      elements.feedback.textContent = i18n.t('form.errors.rssParser');

    default:
      console.log('Unknown error type = ', value);
      break;
  }
  elements.form.reset();
  elements.form.focus();
};
const handleFeeds = (elements, i18n, feeds) => {
  const { feedsContainer } = elements;
  feedsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18n.t('feed.header');
  cardBody.append(cardTitle);

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach((feed) => {
    const feedItem = document.createElement('li');
    feedItem.classList.add('list-group-item', 'border-0', 'border-end-0');

    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    feedItem.append(title, description);
    feedsList.append(feedItem);
  });

  card.append(cardBody, feedsList);
  feedsContainer.append(card);
};
const render = (elements, i18n) => (path, value /* , prevValue */) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, i18n, value);
      break;

    case 'form.valid':
      handleFormValid(elements, i18n, value);
      break;

    case 'errorType':
      handleErrors(elements, i18n, value);
      break;
    case 'feeds':
      handleFeeds(elements, i18n, value);

    default:

      break;
  }
};

export default (elements, i18n) => onChange({
  feeds: [],
  posts: [],
  urls: [],
  errorType: null,
  form: {
    valid: null,
    processState: 'filling',
    fields: {
      input: '',
    },
  },
}, render(elements, i18n));
