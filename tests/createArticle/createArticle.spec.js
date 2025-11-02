import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
const article = {
  title: faker.lorem.sentence(),
  about: faker.lorem.sentence(),
  body: faker.lorem.paragraphs(2),
  tags: faker.lorem.words(3).split(' ').join(', '),
};

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

test('Create an article', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillEmailField(article.title);
  await createArticlePage.fillAboutField(article.about);
  await createArticlePage.fillBodyField(article.body);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickPublishArticleButton();
});

test('Create an article without description field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillEmailField(article.title);
  await createArticlePage.fillBodyField(article.body);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickPublishArticleButton();
});

test('Create an article without text field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillEmailField(article.title);
  await createArticlePage.fillAboutField(article.about);
  await createArticlePage.fillTagsField(article.tags);
  await createArticlePage.clickPublishArticleButton();
});

test('Create an article without tags field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillEmailField(article.title);
  await createArticlePage.fillAboutField(article.about);
  await createArticlePage.fillBodyField(article.body);
  await createArticlePage.clickPublishArticleButton();
});
