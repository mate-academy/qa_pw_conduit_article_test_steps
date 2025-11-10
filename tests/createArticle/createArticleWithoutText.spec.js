import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
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

test('Create an article without article text', async ({ page }) => {
    const article = {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(2),
        tag: faker.word.noun(),
    };

    await homePage.clickNewArticleLink();

    await createArticlePage.fillArticleTitleField(article.title);
    await createArticlePage.fillArticleDescriptionField(article.description);
    await createArticlePage.fillArticleTagsField(article.tag);
    await createArticlePage.clickPublishArticleButton();

    await expect(page).toHaveURL(/.*\/article\/.+/);
    await expect(page.getByRole('heading',
        { name: article.title })).toBeVisible();
});