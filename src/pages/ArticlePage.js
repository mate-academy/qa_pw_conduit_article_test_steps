import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTags = page.locator('.tag-list');
  }

  async assertArticleTitle(articleTitle) {
    await test.step('Check that article title is displayed', async () => {
      await expect(
        this.page.getByRole('heading', { name: articleTitle }),
      ).toBeVisible();
    });
  }

  async assertArticleMarkDown(articleMarkDown) {
    await test.step('Check that article mark down is displayed', async () => {
      await expect(this.page.getByText(articleMarkDown)).toBeVisible();
    });
  }

  async assertArticleTags(articleTags) {
    await test.step('Check that article tag is displayed', async () => {
      for (const tag of articleTags) {
        await expect(this.articleTags).toContainText(tag);
      }
    });
  }

  async assertNoTags() {
    await test.step('Check there are no tags', async () => {
      await expect(this.articleTags).toBeEmpty();
    });
  }
}
