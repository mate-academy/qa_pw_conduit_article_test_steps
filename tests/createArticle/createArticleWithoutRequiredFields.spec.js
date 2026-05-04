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
    username: faker.internet.userName(), // Simpler faker call
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.signUpUser(user.username, user.email, user.password); // Assuming this helper exists
  await homePage.assertYourFeedTabIsVisible();
});

test.describe('Article Creation', () => {
  test('Create an article without required fields', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.clickPublishArticleButton();

    // Conduit usually returns "title can't be blank"
    await createArticlePage.assertErrorMessageContainsText(
      "title can't be blank",
    );
  });

  test('Create an article successfully with all fields', async ({ page }) => {
    const articleData = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(1),
      body: faker.lorem.paragraphs(2),
      tags: 'playwright, testing, automation',
    };

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleDetails(articleData);
    await createArticlePage.clickPublishArticleButton();

    // Verification: Check if we are redirected to the article page
    await test.step('Verify article was created successfully', async () => {
      await expect(page).toHaveURL(new RegExp(/.*\/article\/.*/));
      await expect(page.locator('h1')).toHaveText(articleData.title);
    });
  });
});
