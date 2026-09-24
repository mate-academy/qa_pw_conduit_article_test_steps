import { test } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let articlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

  const user = {
    email: 'danlinker17+viewer@gmail.com',
    password: '11111111',
  };

  article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
  };

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article without tag', async () => {
  await test.step(`Open the 'New Article' page`, async () => {
    await homePage.clickNewArticleLink();
  });
  await test.step('Fill in the article title', async () => {
    await createArticlePage.fillUpArticleTitle(article.title);
  });
  await test.step('Fill in the article description', async () => {
    await createArticlePage.fillUpArticleDescription(article.description);
  });
  await test.step('Fill in the article body', async () => {
    await createArticlePage.fillUpArticleBody(article.body);
  });
  await test.step('Publish the article', async () => {
    await createArticlePage.clickPublishArticleButton();
  });
  await test.step('Wait for the article page to open', async () => {
    await createArticlePage.waitForArticlePageToLoad();
  });

  await test.step('Check the article title', async () => {
    await articlePage.assertArticleTitleIsVisible(article.title);
  });
  await test.step('Check the article body', async () => {
    await articlePage.assertArticleBodyIsVisible(article.body);
  });
});
