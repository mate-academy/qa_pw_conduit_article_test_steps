import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.articleBody = page.locator('.article-content');
    this.articleTags = page.locator('.tag-list');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article title is '${title}'`, async () => {
      await expect(this.articleTitle).toHaveText(title);
    });
  }

  async assertArticleBodyIsVisible(body) {
    await test.step(`Assert the article body contains '${body}'`, async () => {
      await expect(this.articleBody).toContainText(body);
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the article tag '${tag}' is shown`, async () => {
      await expect(this.articleTags).toContainText(tag);
    });
  }
}
