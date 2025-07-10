import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

const article = {
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(2),
  body: faker.lorem.paragraphs(),
  tag: faker.lorem.word(),
};

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

test('Create an article without article text', async () => {
  await createArticlePage.open();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleTagField(article.tag);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});
