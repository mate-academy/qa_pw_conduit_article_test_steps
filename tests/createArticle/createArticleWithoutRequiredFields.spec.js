import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let currentPage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  currentPage = page;

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

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle('Test Article Title');
  await createArticlePage.fillArticleDescription('Test Article Description');
  await createArticlePage.fillArticleBody('Test Article Body');
  await createArticlePage.fillArticleTag('test-tag');
  await currentPage.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertTagExists('test-tag');
  await createArticlePage.assertPostCommentButtonIsVisible();
});


test ('create an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle('Test Article Title');
  await createArticlePage.fillArticleBody('Test Article Body');
  await createArticlePage.fillArticleTag('test-tag');
  await currentPage.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test ('create an article without article body', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle('Test Article Title');
  await createArticlePage.fillArticleDescription('Test Article Description');
  await createArticlePage.fillArticleTag('test-tag');
  await currentPage.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test ('create an article without article tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle('Test Article Title');
  await createArticlePage.fillArticleDescription('Test Article Description');
  await createArticlePage.fillArticleBody('Test Article Body');
  await currentPage.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertPostCommentButtonIsVisible();
});
