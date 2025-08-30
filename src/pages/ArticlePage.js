import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.editArticleBtn = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  async assertEditArticleBtnVisible() {
    await test.step(`Assert the Edit Article btn is visible`, async () => {
      await expect(this.editArticleBtn).toBeVisible();
    });
  }
}
