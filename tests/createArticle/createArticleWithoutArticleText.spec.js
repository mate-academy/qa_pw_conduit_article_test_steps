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

test('Create an article with required and optional fields', async ({
  page,
}) => {
  const articleTitle = faker.lorem.words(5);
  const articleDescription = faker.lorem.paragraph();
  const articleTags = faker.lorem.word();

  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(articleTitle);
  await createArticlePage.fillArticleDescriptionField(articleDescription);
  await createArticlePage.fillArticleTagsField(articleTags);
  await page.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});
