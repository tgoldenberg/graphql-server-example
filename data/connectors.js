import casual from 'casual';
import _ from 'underscore';
import Mongoose from 'mongoose';

console.log('MONGO', process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, process.env.MONGO_URL);
let options = {
  user: process.env.MONGO_USERNAME,
  pass: process.env.MONGO_PASSWORD
};

Mongoose.connect(process.env.MONGO_URL, options);
// Mongoose.connect('mongodb://127.0.0.1:27017/test', options);
const db = Mongoose.connection;

const UserSchema = new Mongoose.Schema({
  email: 'string',
  firstName: 'string',
  lastName: 'string',
});

const PostSchema = new Mongoose.Schema({
  userId: 'string',
  title: 'string',
  text: 'string',
  createdAt: 'number',
});

const CommentSchema = new Mongoose.Schema({
  postId: 'string',
  userId: 'string',
  text: 'string',
  createdAt: 'number',
});

const User = Mongoose.model('User', UserSchema);
const Post = Mongoose.model('Post', PostSchema);
const Comment = Mongoose.model('Comment', CommentSchema);

casual.seed(123);

db.on('error', err => console.log('MONGO ERROR', err))

let users = [];

db.once('open', () => {
  console.log('CONNECTED');
  User.find({}).count()
    .then(userCount => { /* only seed database if it is empty */
      if (userCount > 20) {
        return;
      } else {
        seedData();
      }
    });
});

function seedData(){
  /* create 10 users */
  _.times(10, () => {
    let user = new User({
      email: casual.email,
      firstName: casual.first_name,
      lastName: casual.last_name
    })
    user.save();
    users.push(user);
  });
  users.forEach(user => {
    /* create 5 posts for each user */
    _.times(5, () => {
      let post = new Post({
        userId: user._id,
        title: casual.title,
        text: casual.sentences(3),
        createdAt: casual.unix_time
      });
      post.save();
      _.times(3, () => {
        /* create 3 comments for each post */
        let comment = new Comment({
          postId: post._id,
          text: casual.sentences(2),
          userId: _.sample(users)._id
        });
        comment.save();
      });
    });
  });
}

export { User, Post, Comment };
