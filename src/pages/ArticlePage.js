import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
  }

  async checkArticleUrl() {
    await test.step(`Check article page url`, async () => {
      await expect(this.page).toHaveURL(/\/article\//);
    });
  }

  async checkArticleTitle(expectedTitle) {
    await test.step('Check article title', async () => {
      await expect(this.articleTitle).toHaveText(expectedTitle);
    });
  }
}
