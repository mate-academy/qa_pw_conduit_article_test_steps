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

test('Create an article with required and optional fields', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.words(5),
    body: faker.lorem.paragraph(),
    tag: faker.word.noun(),
  };

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleTagsField(article.tag);

  await page.keyboard.press('Enter');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleTitleIsVisible(article.title);

});

test('Create an article without article description', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    tag: faker.word.noun(),
  };

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleTagsField(article.tag);

  await page.keyboard.press('Enter');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
})

test('Create an article without article text', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.words(5),
    tag: faker.word.noun(),
  }

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleTagsField(article.tag);

  await page.keyboard.press('Enter');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
})

test('Create an article without article tag', async ({ page }) => {
  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.words(5),
    body: faker.lorem.paragraph(),
  };

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleTitleIsVisible(article.title);

});