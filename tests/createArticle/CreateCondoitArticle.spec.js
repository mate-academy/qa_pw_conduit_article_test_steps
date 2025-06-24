import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';

const article = {
  title: 'The best Article',
  description: 'This article about AQA',
  body: 'Automation QA the best profession',
  tag: 'AQA'
};

test.describe('Create conduit article', () => {
  let homePage;
  let articlePage;

  test.beforeEach(async ( { page } ) => {
    const signUpPage = new SignUpPage(page);
    homePage = new HomePage(page);
    articlePage = new CreateArticlePage(page);

    const userData = {
      userName: `${faker.person.firstName()}_${faker.person.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await signUpPage.open();
    await signUpPage.fillUsernameField(userData.userName);
    await signUpPage.fillEmailField(userData.email);
    await signUpPage.fillPasswordField(userData.password);
    await signUpPage.clickSignUpButton();
  });

  test('Create an article with required and optional fields', async () => {
      await homePage.clickNewArticleLink();
      await articlePage.fillArticleTitle(article.title);
      await articlePage.fillArticleDescription(article.description);
      await articlePage.fillArticleBody(article.body);
      await articlePage.addTagForArticle(article.tag);
      await articlePage.clickPublishArticleButton();

      await articlePage.assertErrorMessageIsHidden();

  });
  test('Create an article without article description', async () => {
      await homePage.clickNewArticleLink();
      await articlePage.fillArticleTitle(article.title);
      await articlePage.fillArticleBody(article.body);
      await articlePage.addTagForArticle(article.tag);
      await articlePage.clickPublishArticleButton();

      await articlePage.assertErrorMessageContainsText(
        'Article description cannot be empty'
      );
  });
      

  test('create an article without article text', async () => {
    await homePage.clickNewArticleLink();
    await articlePage.fillArticleTitle(article.title);
    await articlePage.fillArticleDescription(article.description);
    await articlePage.addTagForArticle(article.tag);
    await articlePage.clickPublishArticleButton();

    await articlePage.assertErrorMessageContainsText(
      'Article body cannot be empty'
    );
      
  });

  test('create an article without article tag', async () => {
    await homePage.clickNewArticleLink();
    await articlePage.fillArticleTitle(article.title);
    await articlePage.fillArticleDescription(article.description);
    await articlePage.fillArticleBody(article.body);
    await articlePage.clickPublishArticleButton();

    await articlePage.assertErrorMessageIsHidden();
       
  });

});