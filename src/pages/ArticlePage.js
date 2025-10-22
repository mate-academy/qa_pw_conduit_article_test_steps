import { expect, test } from "@playwright/test";

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = this.page.locator('//h1');
    this.articleDescription = this.page.locator('.article-content p');
    this.tagList = this.page.locator('.tag-list > li');
  }

  async assertTitle(title) {
    await test.step(`Assert the article title '${title}' is shown`, async () => {
      await expect(this.articleTitle).toHaveText(title);
    });
  }

  async assertDescription(description) {
    await test.step(`Assert the article description is shown`, async () => {
      await expect(this.articleDescription).toHaveText(description);
    });
  }

  async assertTagsList(expectedTags) {
    await test.step(`Assert the '${expectedTags}' tags are shown`, async () => {
      await expect(this.tagList.first()).toBeVisible();
      const tagElements = await this.tagList.allTextContents();

      for (const expectedTag of expectedTags) {
        expect(tagElements).toContain(expectedTag);
      }
    });
  }

  async assertTagsAreHidden() {
    await test.step(`Assert the tags are hidden`, async () => {
      await expect(this.tagList.first()).toBeHidden();
    });
  }
}