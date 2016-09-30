import casual from 'casual';
import Sequelize from 'sequelize';
import _ from 'lodash';
import Mongoose from 'mongoose';

Mongoose.connect('mongodb://vader:RPbBa8M5dbVgZ5q8NxETD9Q9QUwFZ5@finance-staging-backend.eastus2.cloudapp.azure.com:27000/development?autoReconnect=true&connectTimeoutMS=300000&socketTimeoutMS=60000');

const db = Mongoose.connection;

db.on('error', err => console.log('MONGO ERROR', err))
db.once('open', () => {
  console.log('CONNECTED');
})
const ViewSchema = new Mongoose.Schema({
  postId: Number,
  views: Number,
});

const AuthorSchema = new Mongoose.Schema({
  firstName: String,
  lastName: String,
});

const PostSchema = new Mongoose.Schema({
  authorId: String,
  title: String,
  text: String,
});

const UserSchema = new Mongoose.Schema({
  _id: 'string',
  emails: 'array',
  stripe: 'object',
  roles: 'array',
  createdAt: 'date',
})

const FeedSchema = new Mongoose.Schema({
  _id: String,
  name: String,
  created_at: Date,
  deleted: Boolean,
  users: Array,
  sources: Array,
  keywords: Array
});

const ClusterSchema = new Mongoose.Schema({
  _id: Object,
  feed_id: String,
  title: String,
  articles: Array,
  summary: Array
});

const ArticleSchema = new Mongoose.Schema({
  _id: Object,
  text: String,
  sources: Array,
  published_at: Date,
  title: String,
})

const View = Mongoose.model('View', ViewSchema);
const Author = Mongoose.model('Author', AuthorSchema);
const Post = Mongoose.model('Post', PostSchema);
const Feed = Mongoose.model('Feed', FeedSchema);
const User = Mongoose.model('User', UserSchema);
const Cluster = Mongoose.model('Cluster', ClusterSchema);
const Article = Mongoose.model('Article', ArticleSchema);

// casual.seed(123);

// _.times(10, () => {
//   let author = new Author({
//     firstName: casual.first_name,
//     lastName: casual.last_name
//   });
//   author.save();
//   console.log('AUTHOR', author);
//   let post = new Post({
//     title: casual.title,
//     text: casual.sentences(3),
//     authorId: author._id
//   });
//   post.save();
//   let view = new View({
//     postId: post._id,
//     views: casual.integer(0, 100)
//   });
//   view.save();
// });

export { Author, Post, View, User, Feed, Cluster, Article };
