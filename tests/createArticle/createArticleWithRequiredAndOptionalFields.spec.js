import { test } from '../fixtures/authFixtures';

test('Create an article with required and optional fields', async ({ authenticatedUser }) => {
  const { homePage, createArticlePage } = authenticatedUser;

  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Test Article');
  await createArticlePage.fillDescriptionField('Test Description');
  await createArticlePage.fillBodyField('Test Body');
  await createArticlePage.addTags(['testing', 'automation', 'playwright']);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertWriteCommentFieldIsVisible();
});
