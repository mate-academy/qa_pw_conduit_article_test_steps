import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByPlaceholder('Article Title');
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyTextarea = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.tagInput = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
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
  async assertArticleIsPosted(title) {
    await test.step(`Assert the article '${title}' is posted`, async () => {
      await expect(this.page.locator('h1')).toContainText(title);
    });
  }

  async fillArticleTitle(title) {
    await test.step('Fill article title', async () => {
      await this.titleInput.fill(title);
    });
  }
  async fillArticleDescription(description) {
    await test.step('Fill article description', async () => {
      await this.descriptionInput.fill(description);
    });
  }
  async fillArticleBody(body) {
    await test.step('Fill article body', async () => {
      await this.bodyTextarea.fill(body);
    });
  }
  async addArticleTag(tag) {
    await test.step('Add article tag', async () => {
      await this.tagInput.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }
}
