import { expect, test } from '@playwright/test';

export class ArticleFullViewPage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleText = page.locator('.article-content');
    this.tagText = page.locator('.tag-default');
  }

  async assertArticleTitle(articleTitle) {
    await test.step(`Assert the '${articleTitle}' error is shown`, async () => {
      await expect(this.articleTitle).toContainText(articleTitle);
    });
  }

  async assertArticleText(articleText) {
    await test.step(`Assert the '${articleText}' error is shown`, async () => {
      await expect(this.articleText).toContainText(articleText);
    });
  }

  async assertTagText(tagText) {
    await test.step(`Assert the '${tagText}' error is shown`, async () => {
      await expect(this.articleText).toContainText(tagText);
    });
  }
}
