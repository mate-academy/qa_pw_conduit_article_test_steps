import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder("What's this article about?");
    this.articleBodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.articleTitle = page.locator('h1');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field with '${title}'`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'Article Description' field with '${description}'`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill the 'Article Body' field with '${body}'`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillArticleTagsField(tag) {
    await test.step(`Fill the 'Article Tags' field with '${tag}'`, async () => {
      await this.articleTagsField.fill(tag);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert article title is visible`, async () => {
      await expect(this.articleTitle).toHaveText(title);
    });
  }
}
