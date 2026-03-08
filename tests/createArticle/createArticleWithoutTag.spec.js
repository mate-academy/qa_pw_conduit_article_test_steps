import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let article;
let articlePage;

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
    title: faker.book.title(),
    about: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
  }

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Creat an article without tag field', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillAboutField(article.about);
  await createArticlePage.fillBodyField(article.body);
  await createArticlePage.clickPublishArticleButton();

  await articlePage.waitForArticlePage();
  await articlePage.assertTitle(article.title);
});
