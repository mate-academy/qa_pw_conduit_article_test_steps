import { test, expect } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let user;
let article = {
  title: faker.lorem.sentence(3),
  description: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(10),
  tag: faker.lorem.word(),
};
let articlePage;

test.beforeEach(async ({ page }) => {
  const signInPage = new SignInPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page);

  user = {
    email: 'maryna@gmail.com',
    password: 'newpass123!',
  };

  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleTagField(article.tag);

  await expect(async () => {
    await createArticlePage.clickPublishArticleButton();
    await articlePage.waitArticlePage();
  }).toPass({ timeout: 30000 });

  await articlePage.assertArticleTitleIsVisible(article.title);
  await articlePage.assertArticleTagIsVisible(article.tag);
});

test('Create an article without article description', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleTagField(article.tag);

  await expect(async () => {
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article description cannot be empty',
    );
  }).toPass({ timeout: 30000 });

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without article text', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleTagField(article.tag);

  await expect(async () => {
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty',
    );
  }).toPass({ timeout: 30000 });

  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleBodyField(article.body);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.clickPublishArticleButton();

  await expect(async () => {
    await createArticlePage.clickPublishArticleButton();
    await articlePage.waitArticlePage();
  }).toPass({ timeout: 30000 });

  await articlePage.assertArticleTitleIsVisible(article.title);
});
