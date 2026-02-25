import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { SignInPage } from '../../src/pages/SignInPage';
import { ProfilePage } from '../../src/pages/ProfilePage';

let homePage;
let createArticlePage;
let profilePage;

test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);
    profilePage = new ProfilePage(page);

    await signInPage.open();
    await signInPage.fillEmailField(process.env.USER_EMAIL);
    await signInPage.fillPasswordField(process.env.USER_PASSWORD);
    await signInPage.clickSignInButton();
    await homePage.assertYourFeedTabIsVisible();
});

test('Create Article Page With Required Fields', async ({ page }) => {
    const articleTitle = 'Some Article Title';

    await homePage.clickNewArticleLink();
    await createArticlePage.fillArticleTitleField(articleTitle);
    await createArticlePage.fillArticleDescriptionField('Article Description');
    await createArticlePage.fillArticleMainTextField('some text');
    await createArticlePage.fillArticleTagsField('Tags');

    await page.keyboard.press('Enter');

    await createArticlePage.clickPublishArticleButton();

    await profilePage.assertCreatedArticleExists(articleTitle);
});