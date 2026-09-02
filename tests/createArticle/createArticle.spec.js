/* eslint-disable max-len */
import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.describe('Create Article Tests', () => {
  test.beforeEach(async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);

    const user = {
      username: faker.internet.username().replace(/[^a-zA-Z0-9_]/g, ''),
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

  test('Create an article with required fields and optional fields', async () => {
    const randomTitle = faker.lorem.words(3);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleTitleField(randomTitle);
    await createArticlePage.fillArticleDescriptionField(faker.lorem.sentence());
    await createArticlePage.fillArticleBodyField(faker.lorem.paragraph());
    await createArticlePage.fillArticleTagsField(faker.lorem.word(1));
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertArticleRowIsVisible();
  });

  test('Create an article without article description', async () => {
    const randomTitle = faker.lorem.words(3);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleTitleField(randomTitle);
    await createArticlePage.fillArticleBodyField(faker.lorem.paragraph());
    await createArticlePage.fillArticleTagsField(faker.lorem.word(1));
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText('Article description cannot be empty'); 
  });

  test('Create an article without article body', async () => {
    const randomTitle = faker.lorem.words(3); 

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleTitleField(randomTitle);
    await createArticlePage.fillArticleDescriptionField(faker.lorem.sentence());
    await createArticlePage.fillArticleTagsField(faker.lorem.word(1));
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText('Article body cannot be empty'); 
  });

  test('Create an article without article tag', async () => {
    const randomTitle = faker.lorem.words(3);

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleTitleField(randomTitle);
    await createArticlePage.fillArticleDescriptionField(faker.lorem.sentence());
    await createArticlePage.fillArticleBodyField(faker.lorem.paragraph());
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertArticleRowIsVisible();
  });
});