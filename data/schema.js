const typeDefinitions = `
  type User {
    email: String
    confirmed: Boolean
    avatarUrl: String
    id: String
    firstName: String
    lastName: String
    fullName: String
    online: Boolean
    available: Boolean
    interests: [Interest]
    notificationSettings: [NotificationSetting]
    calendar: Calendar
    nativeLanguages: [NativeLanguage]
    studyLanguages: [StudyLanguage]
    pendingInvitations: [Invitation]
    allInvitations: [Invitation]
    missedCalls: [Call]
    allCalls: [Call]
    unreadMessages: [Message]
    allMessages: [Message]
    snapshots: [Snapshot]
  }

  type VideoLesson {
    duration : Int
    viewed: Boolean
    durationViewed: Int
    timesViewed: Int
    topic: Topic
    category: Category
    seenByCount: Int
    videoURL: String
  }

  type MultipleChoiceQuiz {
    topic: Topic
    word: Word
    category: Category
  }

  type InteractiveExercise {
    topic: Topic
    category: Category
  }

  type Snapshot {
    date: Int
    activitiesCompleted: Int
    pointsGained: Int
    minutesSpent: Int
    wordsLearned: Int
    awardsGained: [Award]
  }

  type Award {
    name: String
    description: String
    icon: String
    color: String
  }

  type Message {
    text: String
    sender: User
    recipient: User
    sentOn: Int
    receivedBy: Int
    received: Boolean
  }

  type Invitation {
    sender: User
    recipient: User
    sentOn: Int
    receivedBy: Int
    received: Boolean
    expirationDate: Int
    expired: Boolean
  }

  type Call {
    sender: User
    recipient: User
    sentOn: Int
    receivedBy: Int
    duration: Int
    stoppedOn: Int
  }

  type NotificationSetting {
    description: String
    on: Boolean
  }

  type Calendar {
    freeTimes: [Time]
  }

  type Time {
    duration: Int
    date: Int
  }

  type NativeLanguage {
    language: Language
    overallRating: Int
    reviews: [Review]
  }

  type Vocabulary {
    word: String
    mastered: Boolean
    timesPracticed: Int
    category: Category
  }

  type Category {
    language: Language
    name: String
    description: String

  }

  type Language {
    name: String
    countries: [Country]
    conversationsToday: Int
    conversationsThisWeek: Int
    conversationsThisMonth: Int
    conversationsThisQuarter: Int
  }

  type Country {
    name: String
    lat: Int
    lng: Int
    languages: [Language]
  }

  type Review {
    rating: Int
    comment: String
    reviewer: User
    createdAt: Int
  }

  type StudyLanguage {
    language: Language
    totalPoints: Int
    pointsGained: Int
    progress: Int
    vocabulary: [Vocabulary]
    conversations: [Conversation]
  }

  type Flag {
    initiator: User
    accused: User
    createdAt: Int
    resolved: Boolean
    mediator: Admin
  }

  type Admin {
    id: String
    fullName: String
  }

  type Interest {
    name: String
    userCount: Int
    users: [User]
    similarInterests: [Interest]
  }

  type Topic {
    description: String
    suggestedDuration: Int
  }

  type Conversation {
    started: Int
    paused: Int
    language: Language
    flagged: Boolean
    ended: Int
    flags: [Flag]
    topic: Topic
    duration: Int
    teacherDuration: Int
    studentDuration: Int
    studentWordsSpoken: Int
    teacherWordsSpoken: Int
    studentConfidenceLevel: Int
    totalWords: Int
    studentWordsSpeed: Int
    teacherWordsSpeed: Int
    teacher: User
    student: User
    teacherReview: Review
    studentReview: Review
  }

  type Sentence {
    words: [Word]
    difficultyLevel: Int
    wordCount: Int
    topic: Topic
    category: Category
  }

  type Word {
    sentences: [Sentence]
    word: String
    difficultyLevel: Int
    language: Language
    category: Category
    timesStudied: Int
    usedInConversation: Int
    confidenceLevel: Int
    relatedTopics: [Topic]
  }

  type Query {
    user(email: String, id: String): User
    availableUsers(language: String): [User]
    suggestedUsers(language: String): [User]
    availableSuggestedUsers(interests: [String], studyLanguages: [String]): [User]
    availableStudents(interests: [String], nativeLanguages: [String]): [User]
    supportedLanguages(country: String): [Language]
    language(name: String, id: String): Language
    conversations(studentId: String, teacherId: String, studentName: String, teacherName: String): [Conversation]
    word(word: String): Word
  }

  schema {
    query: Query
  }
`;

const speakitTypeDefinitions = `
  type User {
    email: String
    firstName: String
    lastName: String
    id: String
    posts: [Post]
  }

  type Post {
    userId: String
    id: String
    title: String
    text: String
    comments: [Comment]
    user: User
    createdAt: Int
  }

  type Comment {
    postId: String
    id: String
    text: String
    userId: String
    user: User
    post: Post
    createdAt: Int
  }

  type Query {
    user(email: String, id: String): User
    users: [User]
  }

  schema {
    query: Query
  }
`;

export default [speakitTypeDefinitions];

// export default [typeDefinitions];
