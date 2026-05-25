import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let articlePage;

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

test('Create an article with required and optional fields', async ({
  page,
}) => {
  const articleData = {
    articleTitle: faker.lorem.sentence(),
    whatsThisArticleAbout: faker.lorem.sentence(2),
    articleInMarkdown: faker.lorem.paragraphs(2),
    tags: faker.lorem.word(),
  };

  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitle(articleData.articleTitle);
  await createArticlePage.fillWhatsThisArticleAboutField(
    articleData.whatsThisArticleAbout,
  );
  await createArticlePage.fillWriteYourArticleInMarkdownField(
    articleData.articleInMarkdown,
  );
  await createArticlePage.fillEnterTagsField(articleData.tags);

  await page.keyboard.press('Enter');
  await createArticlePage.clickPublishArticleButton();

  await articlePage.assertArticlePageIsVisible(articleData.articleTitle);
});
