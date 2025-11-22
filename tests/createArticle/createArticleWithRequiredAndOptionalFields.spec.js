import { expect, test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let articlePage;
let article;

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

  article = {
    title: faker.lorem.words({ min: 2, max: 5 }),
    description: faker.lorem.sentence(8),
    text: faker.lorem.paragraphs({ min: 1, max: 2 }),
    tag: faker.lorem.words(1),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(article.title);
  await createArticlePage.fillArticleDescription(article.description);
  await createArticlePage.fillArticleText(article.text);
  await createArticlePage.fillArticleTag(article.tag);

  await createArticlePage.clickPublishArticleButton();
  await articlePage.isArticlePageOpened();
  await articlePage.isArticleTag('Created');
});
