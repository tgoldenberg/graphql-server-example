import { User, Post, Comment } from './connectors';

const resolvers = {
  Mutation: {
    submitPost(root, args){
      let post = new Post({
        title: args.title,
        text: args.text,
        userId: args.userId
      });
      console.log('POST', post);
      post.save();
      return post;
    }
  },
  Query: {
    user(root, args){
      return User.findOne({ $or: [{ email: args.email},{ _id: args.id }]})
        .then(user => {
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
        .limit(args.limit || 5)
        .then(users => {
          return users;
        })
    }
  },
  User: {
    posts(user, args) {
      console.log('USER', user, args);
      return Post.find({ userId: user.id })
        .limit(args.limit || 10)
        .then(posts => posts);
    },
    fullName(user) {
      return `${user.firstName} ${user.lastName}`;
    }
  },
  Post: {
    comments(post, args) {
      return Comment.find({ postId: post.id })
        .limit(args.limit || 10)
        .then(comments => comments);
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
