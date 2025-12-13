const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../../src/pages/SignInPage');
const { CreateArticlePage } = require('../../src/pages/CreateArticlePage');

test.describe('Create Article Tests', () => {
  let signInPage;
  let createArticlePage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    createArticlePage = new CreateArticlePage(page);

    await test.step('Navigate to sign in page', async () => {
      await signInPage.goToSignIn();
    });

    await test.step('Sign in with valid credentials', async () => {
      await signInPage.signIn('testuser@example.com', 'Test1234!');
    });

    await test.step('Navigate to New Article page', async () => {
      await createArticlePage.goToNewArticle();
    });
  });

  test('Create article with all fields', async ({ page }) => {
    await test.step('Fill title', async () => {
      await createArticlePage.setTitle('My Test Article');
    });

    await test.step('Fill description', async () => {
      await createArticlePage.setDescription('This is a test description');
    });

    await test.step('Fill body', async () => {
      await createArticlePage.setBody('This is the body of the article');
    });

    await test.step('Add tags', async () => {
      await createArticlePage.addTag('playwright');
      await createArticlePage.addTag('testing');
    });

    await test.step('Publish article', async () => {
      await createArticlePage.submit();
    });

    await test.step('Verify article created', async () => {
      await expect(page.locator('h1')).toHaveText('My Test Article');
    });
  });

  test('Create article without description', async ({ page }) => {
    await test.step('Fill title', async () => {
      await createArticlePage.setTitle('No Description Article');
    });

    await test.step('Fill body', async () => {
      await createArticlePage.setBody('Body content only');
    });

    await test.step('Add tags', async () => {
      await createArticlePage.addTag('test');
    });

    await test.step('Publish article', async () => {
      await createArticlePage.submit();
    });

    await test.step('Verify error message for description', async () => {
      const errors = await createArticlePage.getErrorMessages();
      expect(errors).toContain("description can't be blank");
    });
  });

  test('Create article without body', async ({ page }) => {
    await test.step('Fill title', async () => {
      await createArticlePage.setTitle('No Body Article');
    });

    await test.step('Fill description', async () => {
      await createArticlePage.setDescription('Description content');
    });

    await test.step('Add tags', async () => {
      await createArticlePage.addTag('test');
    });

    await test.step('Publish article', async () => {
      await createArticlePage.submit();
    });

    await test.step('Verify error message for body', async () => {
      const errors = await createArticlePage.getErrorMessages();
      expect(errors).toContain("body can't be blank");
    });
  });

  test('Create article without tags', async ({ page }) => {
    await test.step('Fill title', async () => {
      await createArticlePage.setTitle('No Tag Article');
    });

    await test.step('Fill description', async () => {
      await createArticlePage.setDescription('Description content');
    });

    await test.step('Fill body', async () => {
      await createArticlePage.setBody('Body content');
    });

    await test.step('Publish article', async () => {
      await createArticlePage.submit();
    });

    await test.step('Verify article created', async () => {
      await expect(page.locator('h1')).toHaveText('No Tag Article');
    });
  });
});
