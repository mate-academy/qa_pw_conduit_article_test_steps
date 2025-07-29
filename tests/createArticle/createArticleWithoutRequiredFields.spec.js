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

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

//Here I am working on
//TODO
test('Create an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(faker.word.words(3));
  await createArticlePage.fillArticleTextField(faker.lorem.lines(3));
  await createArticlePage.fillArticleTagField(faker.word.words());
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without article text', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(faker.word.words(3));
  await createArticlePage.fillArticleDescriptionField(faker.lorem.words(3));
  await createArticlePage.fillArticleTagField(faker.word.words());
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(faker.word.words(3));
  await createArticlePage.fillArticleDescriptionField(faker.lorem.words(3));
  await createArticlePage.fillArticleTextField(faker.lorem.lines(3));
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertEditArticleButtonIsPresented();
});
