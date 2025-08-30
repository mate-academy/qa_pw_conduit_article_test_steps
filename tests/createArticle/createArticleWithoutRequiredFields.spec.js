import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';
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

test('Create an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article without article description', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle('New Title');
  await createArticlePage.fillArticleText('Some text');
  await createArticlePage.addArticleTag('new');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without article text', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle('New Title');
  await createArticlePage.fillArticleDescription('New description');
  await createArticlePage.addArticleTag('new');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without tag', async ({ page }) => {
  const articlePage = new ArticlePage(page);

  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle('New Title');
  await createArticlePage.fillArticleDescription('New description');
  await createArticlePage.fillArticleText('Some text');
  await createArticlePage.clickPublishArticleButton();
  await articlePage.assertEditArticleBtnVisible();
});
