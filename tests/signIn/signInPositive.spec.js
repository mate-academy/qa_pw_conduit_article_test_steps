import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Sign in positive tests', () => {
  let signUpPage;
  let signInPage;
  let homePage;
  let user;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    signInPage = new SignInPage(page);
    homePage = new HomePage(page);

    const timestamp = Date.now();
    user = {
      username: `user${timestamp}`,
      email: `user_${timestamp}@gmail.com`,
      password: 'Password123!',
    };

    await signUpPage.open();
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();

    await expect(homePage.yourFeedTab).toBeVisible();
  });

  test('Successful `Sign in` flow test', async () => {
    await signInPage.open();
    await signInPage.fillEmailField(user.email);
    await signInPage.fillPasswordField(user.password);
    await signInPage.clickSignInButton();

    await expect(homePage.yourFeedTab).toBeVisible();
  });
});
