import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
  }

  async assertArtictle(articleTitle, articleMarkDown, articleTags) {
    await test.step('Check that article title is displayed', async () => {
      await expect(
        this.page.getByRole('heading', { name: articleTitle }),
      ).toBeVisible();
    });

    await test.step('Check that article mark down is displayed', async () => {
      await expect(this.page.getByText(articleMarkDown)).toBeVisible();
    });

    await test.step('Check that article tag is displayed', async () => {
      await expect(this.page.getByText(articleTags)).toBeVisible();
    });
  }
}
