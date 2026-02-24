import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { SignInPage } from '../../src/pages/SignInPage';

let homePage
let createArticlePage

test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page)
    homePage = new HomePage(page)
    createArticlePage = new CreateArticlePage(page)

    await signInPage.open()
    await signInPage.fillEmailField(process.env.USER_EMAIL)
    await signInPage.fillPasswordField(process.env.USER_PASSWORD)
    await signInPage.clickSignInButton()
    await homePage.assertYourFeedTabIsVisible()
});

test('Create Article Page With Required Fields', async()=> {
    await homePage.clickNewArticleLink()
    await createArticlePage.fillArticleTitleField('Article Title')
    await createArticlePage.fillArticleDescriptionField('Article Description')
    await createArticlePage.fillArticleMainTextField('some text')
    await createArticlePage.fillArticleTagsField('Tags')
    await createArticlePage.clickPublishArticleButton()
});
