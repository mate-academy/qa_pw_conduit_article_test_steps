import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
  }

  async assertArticlePageIsVisible(articleTitle) {
    await test.step(`Assert the 'Article Page' is shown`, async () => {
      await expect(this.page.locator('h1')).toHaveText(articleTitle);
    });
  }
}
