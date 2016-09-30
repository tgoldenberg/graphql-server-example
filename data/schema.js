const agoloTypeDefinitions = `
  type User {
    email: String
    id: String
    roles: [String]
    stripe: Stripe
  }

  type Stripe {
    card: Card
    customerId: String
    payments: [Payment]
    token: String
    subscription: Subscription
  }

  type Payment {
    amount: Int
    date: String
  }

  type Subscription {
    created: Int
    canceled_at: Int
    current_period_end: Int
    current_period_start: Int
    customer: String
    id: String
    plan: Plan
    status: String
    start: Int
    trial_end: Int
    trial_start: Int
  }

  type Card {
    brand: String
    country: String
    cvc_check: String
    exp_month: Int
    exp_year: Int
    funding: String
    id: String
    last4: String
  }

  type Plan {
    amount: Int
    created: Int
    id: String
    interval: String
    name: String
    trial_period_days: Int
  }

  type Feed {
    id: String
    name: String
    recentClusterCount: Int
    unseenClusterCount: Int
    users: [User]
    recentClusters: [Cluster]
    hotClusters: [Cluster]
  }

  type Cluster {
    id: String
    title: String
    summary: Summary
    articles: [Article]
    source: [Source]
  }

  type Summary {
    summary: [SummarySection]
  }

  type SummarySection {
    sentences: [String]
    metadata: SummaryMetadata
  }

  type SummaryMetadata {
    id: String
    published_at: String
    source: String
    title: String
    url: String
  }

  type Article {
    title: String
    text: String
  }

  type Source {
    id: String
    format: String
    name: String
    publisher: String
  }

  type Query {
    user(id: String, email: String): User
  }

  schema {
    query: Query
  }
`

const typeDefinitions = `
type Author {
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  title: String
  text: String
  author: Author
  views: Int
}

type Query {
  author(firstName: String, lastName: String): Author
}

schema {
  query: Query
}
`;

export default [agoloTypeDefinitions];
