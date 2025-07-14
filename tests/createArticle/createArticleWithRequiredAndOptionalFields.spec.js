import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ProfilePage } from '../../src/pages/ProfilePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let profilePage;
let user;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  profilePage = new ProfilePage(page);
  createArticlePage = new CreateArticlePage(page);

  user = {
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

test('Create an article with required and optional fields', async () => {
  await homePage.clickNewArticleLink();

  const article = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(2),
    text: faker.lorem.paragraphs(3),
    tag: faker.word.adjective(),
  };

  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);
  await createArticlePage.fillTagField(article.tag);

  await createArticlePage.clickPublishArticleButton();

  await profilePage.open(user.username);
  await profilePage.assertArticleTitleContainsText(article.title);
  await profilePage.assertArticleDescriptionContainsText(article.description);
});
