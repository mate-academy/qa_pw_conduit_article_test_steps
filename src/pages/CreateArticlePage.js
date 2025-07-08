import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder(
      `What's this article about?`);
    this.articleText = page.getByPlaceholder(
      `Write your article (in markdown)`);
    this.articleTag = page.getByPlaceholder(`Enter tags`);
    this.getTitle = page.locator('xpath=//h1')
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  };

  async fillArticleTitle(title) {
    await test.step(`Fill article title`, async () => {
      await this.articleTitle.fill(title);
    })
  };

  async fillArticleDescription(description) {
    await test.step(`Fill article description`, async () => {
      await this.articleDescription.fill(description);
    })
  };

  async fillArticleTag(tag) {
    await test.step(`Fill article tag`, async () => {
      await this.articleTag.fill(tag);
    })
  };

  async fillArticleText(text) {
    await test.step(`Fill article text for article`, async () => {
      await this.articleText.fill(text);
    })
  };

  async checkTitle(title) {
    await test.step(`Check title`, async () => {
      await expect(this.getTitle).toContainText(title);
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
