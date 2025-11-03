import { expect, test } from '@playwright/test';

export class ArticleFullViewPage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleText = page.locator('.article-content');
    this.tagText = page.locator('.tag-default');
  }

  async assertArticleTitle(articleTitle) {
    await test.step(`Assert the Title '${articleTitle}'`, async () => {
      await expect(this.articleTitle).toContainText(articleTitle);
    });
  }

  async assertArticleText(articleText) {
    await test.step(`Assert the Text '${articleText}'`, async () => {
      await expect(this.articleText).toContainText(articleText);
    });
  }

  async assertTagText(tagText) {
    await test.step(`Assert the Tag '${tagText}'`, async () => {
      await expect(this.tagText).toContainText(tagText);
    });
  }
}
