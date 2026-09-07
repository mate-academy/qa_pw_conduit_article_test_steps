import { expect, test } from '@playwright/test';

    export class ArticlePage {
  constructor(page) {
    this.page = page;
  }

  async assertArticleUrl() {
    await test.step('Assert the article URL matches pattern', async () => {
      // Sprawdza, czy URL zaczyna się od https://conduit.mate.academy/article/
      await expect(this.page).toHaveURL(/.*\/article\/.+/);
    });
  }
}
