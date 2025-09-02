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

test('Create an article with required and optional fields', async () => {
  const articleTitle = 'This is my test';
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(articleTitle);
  await createArticlePage.fillArticleAboutField('This article is about my test 65362.');
  await createArticlePage.fillArticleBodyField('The article is gonna be very interesting.');
  await createArticlePage.fillArticleTagsField('interesting');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertTitleIsVisible(articleTitle);
});