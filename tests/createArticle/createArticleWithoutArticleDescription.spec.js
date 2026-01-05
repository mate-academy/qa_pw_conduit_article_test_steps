import { test } from '../fixtures/authFixtures';

test('Create an article without article description', async ({ authenticatedUser }) => {
  const { homePage, createArticlePage } = authenticatedUser;

  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Test Article');
  await createArticlePage.fillBodyField('Test Body');
  await createArticlePage.fillTagField('tag1');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});