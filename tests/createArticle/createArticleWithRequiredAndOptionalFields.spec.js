import { test } from "@playwright/test";
import { CreateArticlePage } from "../../src/pages/CreateArticlePage";
import { SignUpPage } from "../../src/pages/SignUpPage";
import { faker } from "@faker-js/faker";
import { HomePage } from '../../src/pages/HomePage';


let createArticlePage;
let signUpPage;
let homePage;

const article = {
  title: faker.lorem.sentence(),
  description: faker.lorem.sentences(2),
  body: faker.lorem.paragraphs(),
  tag: faker.lorem.word(),
};

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: 'u' + faker.lorem.word() + '1',
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
})

test('create an article with required fields', async () => {
  await createArticlePage.open();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyTextArea(article.body);
  await createArticlePage.clickPublishArticleButton();
});

test('create an article with optional fields', async () => {
  await createArticlePage.open();
  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillArticleDescriptionField(article.description);
  await createArticlePage.fillArticleBodyTextArea(article.body);
  await createArticlePage.fillArticleTagField(article.tag);
  await createArticlePage.clickPublishArticleButton();
});

