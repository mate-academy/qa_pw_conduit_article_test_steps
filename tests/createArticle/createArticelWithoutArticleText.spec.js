import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage.js';
import { HomePage } from '../../src/pages/HomePage.js';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage.js';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage.js';

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

test('create an article without body text', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField('This is a test article title');
  await createArticlePage.fillArticleDescriptionField('This is a test article Description');
  await createArticlePage.fillArticleTagsField('test');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});
