import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleInput = page.getByPlaceholder('Article title');
    this.articleDescriptionInput = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyInput = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTagInput = page.getByPlaceholder('Enter tags');

    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.locator('.error-messages');

    this.articleTitleHeading = page.getByRole('heading', { level: 1 }).first();
  }

  async fillArticleTitle(title) {
    await test.step('Fill article title', async () => {
      await this.articleTitleInput.fill(title);
    });
  }

  async fillArticleDescription(description) {
    await test.step('Fill article description', async () => {
      await this.articleDescriptionInput.fill(description);
    });
  }

  async fillArticleBodyInput(body) {
    await test.step('Fill article body', async () => {
      await this.articleBodyInput.fill(body);
    });
  }

  async fillArticleTagInput(tag) {
    await test.step('Fill article tag', async () => {
      await this.articleTagInput.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleIsPublished(expectedTitle) {
    await test.step('Assert article is successfully published', async () => {
      await expect(this.page).toHaveURL(/\/article\//);
      await expect(this.articleTitleHeading).toContainText(expectedTitle);
    });
  }
}
