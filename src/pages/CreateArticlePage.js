import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDesc = page.getByPlaceholder("What's this article about?");
    this.articleText = page.getByPlaceholder('Write your article (in');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async fillArticleTitle(title) {
    await test.step('Fill article title', async () => {
      await this.articleTitle.fill(title);
    });
  }

  async fillArticleDescription(summary) {
    await test.step('Fill article summary', async () => {
      await this.articleDesc.fill(summary);
    });
  }

  async fillArticleText(description) {
    await test.step('Fill article description', async () => {
      await this.articleText.fill(description);
    });
  }

  async addTag(tag) {
    await test.step('Add tag', async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }
}
