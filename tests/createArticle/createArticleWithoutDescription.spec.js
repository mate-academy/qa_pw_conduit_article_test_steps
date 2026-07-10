import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';

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

test('Create an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(faker.lorem.words(3));
  await createArticlePage.fillArticleBodyField(faker.lorem.paragraph());

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});
