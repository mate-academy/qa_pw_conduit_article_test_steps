import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
const title = 'Test Article Title';
const description = 'Test Article Description';
const text = 'Test Article Text';
const tag = 'Test Article Tag';

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

test('Create article with required and optional fields', async ({ page }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(title);
  await createArticlePage.fillDescriptionField(description);
  await createArticlePage.fillTextField(text);
  await createArticlePage.fillTagField(tag);
  await page.keyboard.press('Enter');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleIsCreatedSuccessfully(title, text, tag);
});

test('Create article without description', async ({ page }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(title);
  await createArticlePage.fillTextField(text);
  await createArticlePage.fillTagField(tag);
  await page.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create article without text', async ({ page }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(title);
  await createArticlePage.fillDescriptionField(description);
  await createArticlePage.fillTagField(tag);
  await page.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create article without tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(title);
  await createArticlePage.fillDescriptionField(description);
  await createArticlePage.fillTextField(text);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleCreationSuccessfullyWithoutTag(
    title,
    text,
    tag,
  );
});
