import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

test.describe('Create article flow', () => {
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
    await expect(homePage.yourFeedTab).toBeVisible();
  });

  test('Create an article with required fields', async () => {
    await homePage.clickNewArticleLink();

    await createArticlePage.fillArticleTitle('Test');
    await createArticlePage.fillArticleDescription('Test123123');
    await createArticlePage.fillArticleText(
      `TEst12312342344TEst1231234234TEst12312342344TEst1231234234`,
    );
    await createArticlePage.clickPublishArticleButton();
  });
});
