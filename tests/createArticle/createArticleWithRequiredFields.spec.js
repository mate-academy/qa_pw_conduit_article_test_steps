import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
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

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required fields', async ({ page }) => {
  await homePage.clickNewArticleLink();

  let articleTitle = 'Test Title';
  let articleAbout = 'Test About';
  let articleMarkDown = 'Test Mark Down';
  let articleTags = [];

  await createArticlePage.fillArticleTitle(articleTitle);
  await createArticlePage.fillArticleAbout(articleAbout);
  await createArticlePage.fillArticleMarkDown(articleMarkDown);
  await createArticlePage.fillArticleTags(articleTags);

  await createArticlePage.clickPublishArticleButton();

  await articlePage.assertArticleTitle(articleTitle);
  await articlePage.assertArticleMarkDown(articleMarkDown);
  await articlePage.assertArticleTags(articleTags);
});
