import { test } from '../fixtures/authFixtures';

test('Create an article without article text', async ({ authenticatedUser }) => {
  const { homePage, createArticlePage } = authenticatedUser;

  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Test Article');
  await createArticlePage.fillDescriptionField('Test Description');
  await createArticlePage.fillTagField('tag1');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});