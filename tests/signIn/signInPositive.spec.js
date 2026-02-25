import { test } from '@playwright/test';
import { SignInPage } from '../../src/pages/SignInPage';
import { HomePage } from '../../src/pages/HomePage';

let signInPage;
let homePage;

test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    homePage = new HomePage(page);
});

test('Successful `Sign in` flow test', async () => {
    await signInPage.open();
    await signInPage.fillEmailField(process.env.USER_EMAIL);
    await signInPage.fillPasswordField(process.env.USER_PASSWORD);
    await signInPage.clickSignInButton();

    await homePage.assertYourFeedTabIsVisible();
});
