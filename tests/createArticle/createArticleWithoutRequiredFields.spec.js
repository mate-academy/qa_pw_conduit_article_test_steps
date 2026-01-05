import { test } from '../fixtures/authFixtures';

test('Create an article without required fields', async ({ authenticatedUser }) => {
  const { homePage, createArticlePage } = authenticatedUser;

  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});
