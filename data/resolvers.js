import { User, Post, Comment } from './connectors';

const resolvers = {
  Query: {
    user(root, args){
      console.log('ARGS', args);
      return User.findOne({ email: args.email }).then(user => {
        if (!user) { return user; }
        else {
          return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
          };
        }
      })
    },
    users(root, args){
      return User.find({})
        .then(users => {
          return users;
        })
    }
  },
  User: {
    posts(user) {
      console.log('USER', user);
      return Post.find({ userId: user.id }).then(posts => posts);
    }
  },
  Post: {
    comments(post) {
      return Comment.find({ postId: post.id }).then(comments => comments);
    },
    user(post) {
      return User.findOne({ _id: post.userId }).then(user => user);
    }
  },
  Comment: {
    user(comment) {
      console.log('COMMENT USER', comment);
      return User.findOne({ _id: comment.userId }).then(user => user);
    },
    post(comment) {
      return Post.findOne({ _id: comment.postId }).then(post => post);
    }
  }
};

export default resolvers;
