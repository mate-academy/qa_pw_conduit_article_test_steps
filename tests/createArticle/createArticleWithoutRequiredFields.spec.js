import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('create an article with required and optional fields', async () => {
  const titleText = 'Short title';
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(titleText);
  await createArticlePage.fillArticleDescription('Short description');
  await createArticlePage.fillArticleBody('Some meaningful body text');
  await createArticlePage.addArticleTag('short-tag');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleIsPosted(titleText);
});

test('create an article without article description', async () => {
  const titleText = 'Short title';
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(titleText);
  await createArticlePage.fillArticleBody('Some meaningful body text');
  await createArticlePage.addArticleTag('short-tag');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('create an article without article text', async () => {
  const titleText = 'Short title';
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(titleText);
  await createArticlePage.fillArticleDescription('Short description');
  await createArticlePage.addArticleTag('short-tag');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('create an article without article tag', async () => {
  const titleText = 'Short title';
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(titleText);
  await createArticlePage.fillArticleDescription('Short description');
  await createArticlePage.fillArticleBody('Some meaningful body text');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleIsPosted(titleText);
});
