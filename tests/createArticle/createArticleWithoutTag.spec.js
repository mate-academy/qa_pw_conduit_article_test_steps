import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let articlePage;
let article = {
  title: faker.lorem.sentence(2),
  description: faker.lorem.sentence(3),
  body: faker.lorem.paragraph(4),
};

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

test('Creat an article without tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);

  await createArticlePage.clickPublishArticleButton();

  await articlePage.assertArticleTitleIsVisible(article.title);
});
