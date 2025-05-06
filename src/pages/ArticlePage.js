import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleTag = page.locator('.tag-list .tag-default');
    this.username = page.getByRole('link', { name: 'maryna' }).nth(1);
  }

  async waitArticlePage() {
    await test.step(`Wait for the 'Article' page to load`, async () => {
      await this.page.waitForLoadState('load');
      await expect(this.page).toHaveURL(/.*article*/);
    });
  }

  async assertArticleTitleIsVisible(expectedText) {
    await test.step(`Assert the 'Article Title' is visible`, async () => {
      await expect(this.articleTitle).toContainText(expectedText);
    });
  }

  async assertArticleTagIsVisible(expectedText) {
    await test.step(`Assert the 'Article Tag' is visible`, async () => {
      await expect(this.articleTag).toContainText(expectedText);
    });
  }
}
