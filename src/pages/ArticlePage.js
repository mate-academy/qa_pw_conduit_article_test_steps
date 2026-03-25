import { expect, test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.errorMessage = page.getByRole('list').nth(1);
  }

  articleTitle(title) {
    return this.page.getByRole('heading', { name: title, level: 1 });
  }
  articleBody(body) {
    return this.page.getByText(body);
  }
  articleTags(tags) {
    return this.page.getByText(tags);
  }
  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert '${title}' of article is visible`, async () => {
      await expect(this.articleTitle(title)).toBeVisible();
    });
  }

  async assertArticleBodyIsVisible(body) {
    await test.step(`Assert '${body}' of article is visible`, async () => {
      await expect(this.articleBody(body)).toBeVisible();
    });
  }
  async assertArticleTagsIsVisible(tags) {
    await test.step(`Assert '${tags}' of article is visible`, async () => {
      await expect(this.articleTags(tags)).toBeVisible();
    });
  }
}
