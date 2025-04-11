import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
  }
  async assertHeaderIsVisible(text) {
    await test.step(`Assert that the header '${text}' is visible`, async () => {
      await expect(this.page.getByRole('heading', { name: text }))
        .toBeVisible();
    });
  }
}
