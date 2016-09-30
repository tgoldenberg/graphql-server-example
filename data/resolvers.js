import { Author, Post, View, Cluster, Feed, User, Article } from './connectors';

const resolvers = {
  Query: {
    user(root, args) {
      console.log('ARGS', args);
      return User.findOne({ "emails.0.address": args.email }, 'emails stripe roles')
        .then(user => {
          console.log('USER',user)
          return {
            email: user.emails[0].address,
            roles: user.roles,
            id: user._id
          };
        });
    }
  },
  User: {
    stripe(user) {
      return user.stripe;
    },
  },
  Stripe: {
    card(stripe){
      return stripe.card;
    },
    payments(stripe){
      return stripe.payments;
    },
    subscription(stripe){
      return stripe.subscription;
    }
  },
  Subscription: {
    plan(subscription){
      return subscription.plan;
    }
  },
  Feed: {
    users(feed) {
      return User.find({_id: { $in: feed.users.map(u => u.user_id)}})
    },
    recentClusters(feed) {
      return Cluster.find({ feed_id: feed._id }, { limit: 100 })
    },
    hotClusters(feed) {
      return Cluster.find({ feed_id: feed._id }, { limit: 100 })
    }
  },
  Cluster: {
    summary(cluster) {
      return cluster.summary;
    },
    articles(cluster) {
      return Article.find({ _id: { $in: cluster.articles }});
    },
    source(cluster){
      return cluster.source;
    }
  },
  Summary: {
    summary(summary){
      return summary.summary;
    }
  },
  SummarySection: {
    metadata(summarySection){
      return summarySection.metadata;
    }
  }
};

export default resolvers;

// Query: {
//   author(root, args) {
//     let author = Author.findOne({ ...args });
//     console.log('AUTHOR', author);
//     return author;
//   },
// },
// Author: {
//   posts(author) {
//     return Post.find({ authorId: author._id });
//   },
// },
// Post: {
//   author(post) {
//     return Author.findOne({ _id: post.authorId });
//   },
//   views(post) {
//     return View.findOne({ postId: post.id }).then((view) => view.views)
//   }
// },
