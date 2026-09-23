import { test } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

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

test('Create an article without description', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillUpArticleTitle(article.title);
  await createArticlePage.fillUpArticleBody(article.body);
  await createArticlePage.fillUpArticleTags(article.tag);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});
