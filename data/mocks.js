import casual from 'casual';
import cuid from 'cuid';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => {
      return { firstName: casual.first_name, lastName: casual.last_name };
    }
  }),
  User: () => ({
    email: casual.email,
    id: cuid(),
    roles: casual.array_of_words(3)
  }),
  Author: () => ({ firstName: casual.first_name, lastName: casual.last_name }),
  Post: () => ({
    title: casual.title,
    text: casual.sentences(3)
  }),
  Feed: () => ({
    name: casual.word,
    id: cuid(),
    recentClusterCount: casual.integer(0, 1000),
    unseenClusterCount: casual.integer(0, 500),
  }),
  Cluster: () => ({
    id: cuid(),
    title: casual.title
  }),
  SummarySection: () => ({
    sentences: casual.sentences(2).split('.')
  }),
  SummaryMetadata: () => ({
    published_at: casual.date(),
    source: casual.word,
    url: casual.url
  })
};

export default mocks;
