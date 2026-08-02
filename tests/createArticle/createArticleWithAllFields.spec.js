import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let articlePage;

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

test('Create article with all fields filled in', async ({ page }) => {
  articlePage = new ArticlePage(page);

  await homePage.clickNewArticleLink();

  const title = faker.lorem.sentence();
  const aboutText = faker.lorem.sentence();
  const bodyText = faker.lorem.paragraphs();
  const tag = faker.lorem.word();

  await createArticlePage.fillArticleTitleField(title);
  await createArticlePage.fillArticleAboutField(aboutText);
  await createArticlePage.fillArticleBodyField(bodyText);
  await createArticlePage.fillArticleTagsField(tag);
  await createArticlePage.clickPublishArticleButton();
  await articlePage.waitForOpened();
  await articlePage.assertArticleTitleIsVisible(title);
});
