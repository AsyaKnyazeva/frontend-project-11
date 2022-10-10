import _ from 'lodash';
import loadRSS from './RSS.js';
import parserRSS from './parser.js';

const updateRSS = (state) => {
  const { feeds, posts } = state;
  const promises = feeds.map((feed) => loadRSS(feed.url)
    .then((rss) => {
      const [, loadedPosts] = parserRSS(rss);

      const oldPosts = posts.filter((post) => post.feedID === feed.id);
      const diff = _.differenceBy(loadedPosts, oldPosts, 'link');
      if (diff.length !== 0) {
        const postsToAdd = diff.map((post) => ({ ...post, id: _.uniqueId(), feedId: feed.id }));
        state.posts = [...postsToAdd, ...posts];
      }
    })
    .catch((e) => console.log(e)));
  Promise.all(promises)
    .finally(() => setTimeout(() => updateRSS(state), 5000));
};

export default updateRSS;
