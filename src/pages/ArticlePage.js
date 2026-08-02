import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
  }

  async waitForOpened() {
    await test.step(`Wait for the article page to open`, async () => {
      await this.page.waitForURL(/\/article\/.+/);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(
      `Assert the article title '${title}' is visible`,
      async () => {
        await expect(
          this.page.getByRole('heading', { name: title }),
        ).toBeVisible();
      },
    );
  }
}
