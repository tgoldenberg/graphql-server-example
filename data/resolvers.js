import { Author, Post, View, Cluster, Feed, User, Article } from './connectors';

const resolvers = {
  Query: {
    user(root, args) {
      return User.findOne({ "emails.0.address": args.email })
        .then(user => {
          return {
            email: user.emails[0].address,
            roles: user.roles,
            id: user._id,
            stripe: user.stripe
          };
        });
    }
  },
  User: {
    stripe(user) {
      return user.stripe;
    },
    feeds(user) {
      // console.log('USER', user);
      return Feed.find({ user_id: user.id, deleted: false })
        .limit(1000)
        .then(feeds => feeds.map(feed => ({
          name: feed.name,
          users: feed.users,
          id: feed._id
        })))
    }
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
        .then(users => users.map(user => {
          console.log('USER', user);
          return ({
            email: user.emails[0].address,
            id: user._id,
          });
        }));
    },
    recentClusterCount(feed){
      return Cluster.find({ feed_id: feed.id }).count();
    },
    recentClusters(feed) {
      return Cluster.find({ feed_id: feed.id })
        .limit(3)
        .sort({ last_updated_at: -1 })
        .then(clusters => clusters.map(cluster => {
          // console.log('CLUSTER', cluster);
          return {
            id: cluster._id,
            title: cluster.title
          };
        }))
    },
    hotClusters(feed) {
      // console.log('FEED', feed.id);
      return Cluster.find({ feed_id: feed.id })
        .limit(3)
        .then(clusters => clusters.map(cluster => {
          console.log('CLUSTER', cluster);
          return {
            id: cluster._id,
            title: cluster.title,
            summary: cluster.summary
          };
        }))
    }
  },
  Cluster: {
    summary(cluster) {
      console.log('CLUSTER', cluster);
      return cluster.summary;
    }
  },
  SummarySection: {
    metadata(section){
      console.log('SECTION', section);
      return section.metadata;
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
