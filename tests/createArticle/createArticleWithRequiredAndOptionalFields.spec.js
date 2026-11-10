import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let articlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

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

test('Create an article with required and optional fields filled', async () => {
  const title = faker.lorem.word();
  const text = faker.lorem.paragraphs(3);
  const description = faker.lorem.paragraphs(1);
  const tag = faker.lorem.word();

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(title);
  await createArticlePage.fillArticleDescriptionField(description);
  await createArticlePage.fillArticleTextField(text);
  await createArticlePage.fillArticleTagField(tag);
  await createArticlePage.clickPublishArticleButton();

  await articlePage.waitForOpened();
  await articlePage.assertArticleTitleContainsText(title);
  await articlePage.assertArticleBodyContainsText(text);
  await articlePage.assertArticleTagListContainsText(tag);
});
