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

test('Create article without description', async () => {
  await homePage.clickNewArticleLink();

  const title = faker.lorem.sentence();
  const bodyText = faker.lorem.paragraphs();
  const tag = faker.lorem.word();

  await createArticlePage.fillArticleTitleField(title);
  await createArticlePage.fillArticleBodyField(bodyText);
  await createArticlePage.fillArticleTagsField(tag);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});
