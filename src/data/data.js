import { faker } from '@faker-js/faker';

export function generateArticle() {
  return {
    title: faker.lorem.sentence(4),
    description: faker.lorem.sentence(8),
    body: faker.lorem.paragraphs(3),
    tags: faker.lorem.word(),
  };
}