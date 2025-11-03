import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticleFullViewPage } from '../../src/pages/ArticleFullViewPage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;
let articleFullViewPage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);
  articleFullViewPage = new ArticleFullViewPage(page);

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

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Creat an article with required and optional  fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Title');
  await createArticlePage.fillDescriptionField('Description');
  await createArticlePage.fillTextField('Text');
  await createArticlePage.fillTagsField('tag');

  await createArticlePage.clickPublishArticleButton();

  await articleFullViewPage.assertArticleTitle('Title');
  await articleFullViewPage.assertArticleText('Text');
  await articleFullViewPage.assertTagText('tag');
});

test('Creat an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Title');
  await createArticlePage.fillTextField('Text');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
});

test('Creat an article without article text', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Title');
  await createArticlePage.fillDescriptionField('Description');

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField('Title');
  await createArticlePage.fillDescriptionField('Description');
  await createArticlePage.fillTextField('Text');

  await createArticlePage.clickPublishArticleButton();

  await articleFullViewPage.assertArticleTitle('Title');
  await articleFullViewPage.assertArticleText('Text');
});
