import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../src/pages/HomePage';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { ArticlePage } from '../../src/pages/ArticlePage';

let homePage;
let createArticlePage;
let articlePage;
 
test.beforeEach (async ( {page} ) => {
    const signUpPage = new SignUpPage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);
    articlePage = new ArticlePage(page);

    const user = {
        username : `${faker.person.firstName()}_${faker.person.lastName()}`,
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


test ('Create an article', async() => {
    await homePage.clickNewArticleLink();

    const title = faker.lorem.sentence();
    const about = faker.lorem.sentence();
    const text = faker.lorem.paragraphs();

    await createArticlePage.fillTitleField(title);
    await createArticlePage.fillAboutField(about);
    await createArticlePage.fillArticleTextField(text);
    await createArticlePage.clickPublishArticleButton();
    await articlePage.assertTitleisVisible(title);
})
