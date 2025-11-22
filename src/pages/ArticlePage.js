import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleTag = page.locator('li').nth(4);
  }

  async isArticlePageOpened() {
    await test.step('Assert is Article page opened', async () => {
      await expect(this.page).toHaveURL(/\/article\//);
    });
  }

  async isArticleTag(toBeCreated) {
    await test.step('Is article tag created', async () => {
      if (toBeCreated === 'Created') {
        await expect(this.articleTag).toBeVisible();
      } else {
        await expect(this.articleTag).toBeHidden();
      }
    });
  }
}
