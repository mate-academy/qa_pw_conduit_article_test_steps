import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsInput = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.locator('.error-messages');
  }

  async fillArticleDetails(article) {
    await test.step('Fill in article details', async () => {
      if (article.title) await this.titleInput.fill(article.title);
      if (article.description)
        await this.descriptionInput.fill(article.description);
      if (article.body) await this.bodyInput.fill(article.body);
      if (article.tags) {
        await this.tagsInput.fill(article.tags);
        await this.page.keyboard.press('Enter'); // Critical fix for tag registration
      }
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
}
