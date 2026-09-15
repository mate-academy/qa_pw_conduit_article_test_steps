import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let article;
let page;
let articlePage;
let tag;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  article = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(3),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

tag = faker.lorem.word();

test('Create an article without description', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(article.title);
  await createArticlePage.fillArticleBody(article.body);
  await createArticlePage.addArticleTag(tag);
  await createArticlePage.clickArticleTag(tag);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});
