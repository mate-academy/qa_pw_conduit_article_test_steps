import { test, expect } from '@playwright/test';
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
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  // Using generic signup flow
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test.describe('Article Creation Tests', () => {
  test('create an article with required and optional fields', async ({
    page,
  }) => {
    const articleData = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(1),
      tags: 'playwright',
    };

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleDetails(articleData);
    await createArticlePage.clickPublishArticleButton();

    await expect(page).toHaveURL(new RegExp(/.*\/article\/.*/));
    await expect(page.locator('h1')).toHaveText(articleData.title);
  });

  test('create an article without article description', async () => {
    const articleData = {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(1),
    };

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleDetails(articleData);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      "description can't be blank",
    );
  });

  test('create an article without article text', async () => {
    const articleData = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
    };

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleDetails(articleData);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      "body can't be blank",
    );
  });

  test('create an article without article tag', async ({ page }) => {
    const articleData = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(1),
      // tags omitted
    };

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleDetails(articleData);
    await createArticlePage.clickPublishArticleButton();

    // In Conduit, tags are optional for creation, so this should succeed
    await expect(page).toHaveURL(new RegExp(/.*\/article\/.*/));
    await expect(page.locator('h1')).toHaveText(articleData.title);
  });
});
