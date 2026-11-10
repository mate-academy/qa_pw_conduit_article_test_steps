import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.articleBody = page.locator('.article-content p');
    this.articleTags = page.locator('ul.tag-list');
  }

  async waitForOpened() {
    await test.step(`Wait until the article URL is displayed`, async () => {
      await this.page.waitForURL('/article/*');
    });
  }

  async assertArticleTitleContainsText(title) {
    // eslint-disable-next-line max-len
    await test.step(`Assert Article Title contains the entered title`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }

  async assertArticleBodyContainsText(text) {
    // eslint-disable-next-line max-len
    await test.step(`Assert Article Body contains the entered text`, async () => {
      await expect(this.articleBody).toContainText(text);
    });
  }

  async assertTaglistIsEmpty() {
    await test.step(`Assert Tag list is empty`, async () => {
      await expect(this.articleTags).toBeEmpty();
    });
  }

  async assertArticleTagListContainsText(tag) {
    // eslint-disable-next-line max-len
    await test.step(`Assert Article Tag list contains the entered tag`, async () => {
      await expect(this.articleTags).toContainText(tag);
    });
  }
}
