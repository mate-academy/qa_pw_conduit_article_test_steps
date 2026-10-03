import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let articleData;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  articleData = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tag: faker.lorem.word(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickNewArticleLink();
});

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article with required and optional fields', async () => {
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillBodyField(articleData.body);
  await createArticlePage.fillTagsField(articleData.tag);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleCreated(articleData.title);
});

test('Create an article without article description', async () => {
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillBodyField(articleData.body);
  await createArticlePage.fillTagsField(articleData.tag);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without article text', async () => {
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillTagsField(articleData.tag);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await createArticlePage.fillTitleField(articleData.title);
  await createArticlePage.fillDescriptionField(articleData.description);
  await createArticlePage.fillBodyField(articleData.body);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleCreated(articleData.title);
});
