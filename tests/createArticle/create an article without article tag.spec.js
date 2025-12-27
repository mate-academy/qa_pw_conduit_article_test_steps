import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
const title = faker.lorem.sentence();

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

test('create an article without article tag', async () => {
  await createArticlePage.fillArticleTitle(title);
  await createArticlePage.fillArticleDescription(faker.lorem.sentence());
  await createArticlePage.fillArticleBodyInput(faker.lorem.paragraphs(1));
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleIsPublished(title);
});
