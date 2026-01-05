import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

export const test = base.extend({
  // authenticated user
  authenticatedUser: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);
    const createArticlePage = new CreateArticlePage(page);

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

    await use({ homePage, createArticlePage, user });
  },
});

export { expect } from '@playwright/test';

