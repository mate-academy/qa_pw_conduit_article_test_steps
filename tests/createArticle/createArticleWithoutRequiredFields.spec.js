import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { SignInPage } from '../../src/pages/SignInPage';
import { ProfilePage } from '../../src/pages/ProfilePage';

let homePage;
let createArticlePage;
let profilePage

test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page)
    homePage = new HomePage(page)
    createArticlePage = new CreateArticlePage(page)
    profilePage = new ProfilePage(page)

    await signInPage.open()
    await signInPage.fillEmailField(process.env.USER_EMAIL)
    await signInPage.fillPasswordField(process.env.USER_PASSWORD)
    await signInPage.clickSignInButton()
    await homePage.assertYourFeedTabIsVisible()
});

test('Create an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article without description field', async () => {
    await homePage.clickNewArticleLink()

    await createArticlePage.fillArticleTitleField('Article Title')
    await createArticlePage.fillArticleMainTextField('some text')
    await createArticlePage.clickPublishArticleButton()

    await createArticlePage.assertErrorMessageContainsText(
        'Article description cannot be empty',
    )
})

test('Create an article without body field', async () => {
    await homePage.clickNewArticleLink()

    await createArticlePage.fillArticleTitleField('Article Title')
    await createArticlePage.fillArticleDescriptionField('Article Description')
    await createArticlePage.clickPublishArticleButton()

    await createArticlePage.assertErrorMessageContainsText(
        'Article body cannot be empty',
    )
})

test('Create an article without tags field', async () => {
    await homePage.clickNewArticleLink()
    const articleTitle = 'Article Title'

    await createArticlePage.fillArticleTitleField(articleTitle)
    await createArticlePage.fillArticleMainTextField('some text')
    await createArticlePage.fillArticleDescriptionField('Article Description')
    await createArticlePage.clickPublishArticleButton()

    await profilePage.open()
    await profilePage.assertCreatedArticleExists(articleTitle)
})
