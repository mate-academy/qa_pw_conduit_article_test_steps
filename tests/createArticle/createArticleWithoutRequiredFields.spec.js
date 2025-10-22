import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
/** @type {CreateArticlePage} */
let createArticlePage;
/** @type {ArticlePage} */
let articlePage;
let article;

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

  article = {
    title: faker.lorem.sentence(3),
    about: faker.lorem.sentence(5),
    description: faker.lorem.paragraph(1),
    tags: faker.helpers.arrayElements(
        ['tech', 'ai', 'health', 'design', 'travel', 'business', 'science', 'food'],
        3
    ),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillDescriptionArticleField(article.description);
  await createArticlePage.addArticleTags(article.tags);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Create an article without article text', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillAboutArticleField(article.about);
  await createArticlePage.addArticleTags(article.tags);

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillArticleTitleField(article.title);
  await createArticlePage.fillAboutArticleField(article.about);
  await createArticlePage.fillDescriptionArticleField(article.description);

  await createArticlePage.clickPublishArticleButton();

  await articlePage.assertTitle(article.title);
  await articlePage.assertDescription(article.description);
  await articlePage.assertTagsAreHidden();
});
