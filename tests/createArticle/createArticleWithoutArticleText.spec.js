import test from "@playwright/test";
import { SignUpPage } from "../../src/pages/SignUpPage";
import { HomePage } from "../../src/pages/HomePage";
import { CreateArticlePage } from "../../src/pages/CreateArticlePage";
import { faker } from "@faker-js/faker";
import { ArticlePage } from "../../src/pages/ArticlePage";

let homePage;
let createArticlePage;
let articlePage

test.beforeEach(async({page}) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articlePage = new ArticlePage(page)

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

test('Create an article with required and optional fields', async () => {
  const articleTitle = faker.lorem.words();
  const articleDescription = faker.lorem.sentences();
  const articleTag1 = faker.lorem.word();
  const articleTag2 = faker.lorem.word();
  
  await homePage.clickNewArticleLink();
  await createArticlePage.fillArticleTitle(articleTitle);
  await createArticlePage.fillArticleDescription(articleDescription);
  await createArticlePage.addArticleTag(articleTag1);
  await createArticlePage.addArticleTag(articleTag2);
  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
})