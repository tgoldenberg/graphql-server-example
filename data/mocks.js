import casual from 'casual';
import cuid from 'cuid';

const mocks = {
  String: () => 'It works!',
  Boolean: () => true,
  Query: () => ({}),
  User: () => ({
    email: casual.email,
    id: cuid(),
    firstName: casual.first_name,
    lastName: casual.last_name,
    fullName: `${casual.first_name} ${casual.last_name}`
  }),
  Language: () => ({
    name: casual.word
  }),
  Country: () => ({
    name: casual.word
  })
};

export default mocks;
