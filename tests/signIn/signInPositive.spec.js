import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';

let signUpPage;
let signInPage;
let homePage;
let user;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  signInPage = new SignInPage(page);
  homePage = new HomePage(page);

  user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  // Register a new user
  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();

  await homePage.assertYourFeedTabIsVisible();

  // Clear authentication and go to Sign In page
  await page.context().clearCookies();
  await page.goto('/user/login');
});

test('Successful `Sign in` flow test', async () => {
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(user.password);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
