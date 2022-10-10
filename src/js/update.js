import _ from "lodash";
import loadRSS from "./RSS.js";
import parserRSS from "./parser.js";

const updateRSS = (state) => {
  const { feeds, posts } = state;
  feeds.map((feed) => loadRSS(feed.url)
    .then(({ data }) => {
      const [loadedFeed, loadedPosts] = parserRSS(data);
      const oldPosts = posts.filter((post) => post.feedID === feed.id);
      const diff = _.differenceBy(loadedPosts, oldPosts, 'link');

    })
    .catch((e) => console.log(e)));
};

export default updateRSS;