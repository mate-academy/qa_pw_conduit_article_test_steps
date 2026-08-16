import {test, expect } from "@playwright/test";

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('h1');
    this.articleText = page.locator('.article-content p');
    this.articleTag = page.locator('.tag-list');
  }

  async assertTitleIsDisplayed(articleTitle) {
    await test.step(`Assert the article title '${articleTitle}' is displayed`, async () => {
      await expect(this.articleTitle).toHaveText(articleTitle)
    })
  }
  
  async assertTextIsDisplayed(articleText) {
    await test.step(`Assert the article text is displayed`, async () => {
      await expect(this.articleText).toHaveText(articleText)
    })
  }
  
  async assertTagIsDisplayed(articleTag) {
    await test.step(`Assert the article tag '${articleTag}' is displayed`, async () => {
      await expect(this.articleTag).toContainText(articleTag);
    })
  }
}