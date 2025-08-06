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

test('Successful `Create Article` flow test (with all fields)', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(articleData.articleTitle);
  await createArticlePage.fillArticleDescription(articleData.articleDescription);
  await createArticlePage.fillArticleBody(articleData.articleBody);
  await createArticlePage.fillArticleTags(articleData.articleTag);
  await createArticlePage.clickPublishArticleButton();
  
  await homePage.clickHomeLink();
  await homePage.clickGlobalFeedTabLink();

  await createArticlePage.assertArticleCreation(articleData.articleTitle);
});

test('Successful `Create Article` flow test (without optional fields)', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(articleData.articleTitle);
  await createArticlePage.fillArticleDescription(articleData.articleDescription);
  await createArticlePage.fillArticleBody(articleData.articleBody);
  await createArticlePage.clickPublishArticleButton();
  
  await homePage.clickHomeLink();
  await homePage.clickGlobalFeedTabLink();

  await createArticlePage.assertArticleCreation(articleData.articleTitle);
});