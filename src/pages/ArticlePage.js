import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the 'Article Title' is visible`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }
}
