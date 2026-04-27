import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage
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
  await homePage.assertYourFeedTabIsVisible();
});


 const content = {
    text: faker.lorem.words(5),
    title: faker.lorem.sentence(),
    description:faker.lorem.paragraph(),
    tag: faker.word.noun(),
  };

test('Creat an article without article description', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickNewArticleTitle();
  await createArticlePage.fillNewTitleField(content.title);

  await createArticlePage.clickNewArticleText();
  await createArticlePage.fillNewText(content.text);

  await createArticlePage.clickNewArticleTag();
  await createArticlePage.fillNewTag(content.tag);
  
await createArticlePage.clickPublishArticleButton();
 await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
 
});