import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { generateRandomString } from '../../src/helpers/GenerateRandomString';
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

  await homePage.clickNewArticleLink();
});

test('Creat an article without body text', async () => {
  const articleTitleText = generateRandomString(8);
  const articleHeaderText = generateRandomString(20);
  const articleTagsText = generateRandomString(10);

  await createArticlePage.fillArticleTitle(articleTitleText);
  await createArticlePage.fillArticleHeader(articleHeaderText);
  await createArticlePage.fillArticleTags(articleTagsText);
  await createArticlePage.clickPublishArticleButton();

  const messageText = 'Article body cannot be empty';

  await createArticlePage.assertErrorMessageContainsText(messageText);
});
