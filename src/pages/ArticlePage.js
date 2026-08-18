import { test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    }
  

  async waitForOpen() {
  await test.step(`Wait for the Article page to open`, async () => {
    await this.page.waitForURL(/\/article\//);
    });
  }
}