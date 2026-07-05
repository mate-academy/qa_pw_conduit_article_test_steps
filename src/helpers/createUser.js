import { faker } from '@faker-js/faker';

export async function createUser(request) {
  const username =
    `${faker.person.firstName()}_${faker.person.lastName()}`.toLowerCase();

  const user = {
    username,
    email: faker.internet.email().toLowerCase(),
    password: 'newpass123!',
  };

  await request.post('/api/users', {
    data: {
      user,
    },
  });

  return user;
}
