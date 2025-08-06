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

const articleData = {
  articleTitle: faker.lorem.sentence(5),
  articleDescription: faker.lorem.sentence(10),
  articleBody: faker.lorem.paragraphs(3),
  articleTag: faker.word.noun(), 
};

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Creat an article without article description', async () => {
  await homePage.clickNewArticleLink();


  await createArticlePage.fillArticleTitle(articleData.articleTitle);
  await createArticlePage.fillArticleBody(articleData.articleBody);
  await createArticlePage.fillArticleTags(articleData.articleTag);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Creat an article without article text', async () => {
  await homePage.clickNewArticleLink();


  await createArticlePage.fillArticleTitle(articleData.articleTitle);
  await createArticlePage.fillArticleDescription(articleData.articleDescription);
  await createArticlePage.fillArticleTags(articleData.articleTag);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});
