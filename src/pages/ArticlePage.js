import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole('heading');
  }

  async assertTitle(title) {
    await test.step(`Assert that title is ${title}`, async () => {
      await expect(this.title).toHaveText(title);
    });
  }

  async waitForArticlePage() {
    await test.step('Wait for Article page URL', async () => {
      await this.page.waitForURL('**/article/**');
    });
  }


}