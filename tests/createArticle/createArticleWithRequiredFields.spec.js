import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';

let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
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

test.describe('Create an article with required fields tests', () => {
  test('Create an article with required and optional fields', async () => {
    await createArticlePage.fillArticleTitleField(article.title);
    await createArticlePage.fillArticleDescriptionField(article.description);
    await createArticlePage.fillArticleBodyField(article.body);
    await createArticlePage.fillArticleTagField(article.tag);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertArticleTitleIsVisible(article.title);
  });

  test('Create an article without article description', async () => {
    await createArticlePage.fillArticleTitleField(article.title);
    await createArticlePage.fillArticleBodyField(article.body);
    await createArticlePage.fillArticleTagField(article.tag);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article description cannot be empty',
    );
  });

  test('Create an article without article body', async () => {
    await createArticlePage.fillArticleTitleField(article.title);
    await createArticlePage.fillArticleDescriptionField(article.description);
    await createArticlePage.fillArticleTagField(article.tag);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty',
    );
  });

  test('Create an article without article tag', async () => {
    await createArticlePage.fillArticleTitleField(article.title);
    await createArticlePage.fillArticleDescriptionField(article.description);
    await createArticlePage.fillArticleBodyField(article.body);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertArticleTitleIsVisible(article.title);
  });
});
