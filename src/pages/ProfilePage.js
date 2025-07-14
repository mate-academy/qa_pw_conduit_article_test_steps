import { expect, test } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.locator('a.preview-link h1');
    this.articleDescription = page.locator('a.preview-link p');
  }

  async open(username) {
    await test.step(`Open 'Profile' page for user: ${username}`, async () => {
      await this.page.goto(`/profile/${username.toLowerCase()}`);
    });
  }

  async assertArticleTitleContainsText(title) {
    await test.step(`Article 'Title' is shown`, async () => {
      await expect(this.articleTitle).toContainText(title);
    });
  }

  async assertArticleDescriptionContainsText(description) {
    await test.step(`Article 'Description' is shown`, async () => {
      await expect(this.articleDescription).toContainText(description);
    });
  }
}
