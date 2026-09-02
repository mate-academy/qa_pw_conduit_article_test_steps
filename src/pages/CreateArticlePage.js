/* eslint-disable max-len */
import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByRole('textbox', {
      name: 'Article Title',
    });
    this.articleDescriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
    this.articleBodyField = page.getByRole('textbox', { name: 'Write your article (in' });
    this.articleTagsField = page.getByRole('textbox', { name: 'Enter tags' });
    this.articleRow = page.getByRole('paragraph');
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

  async fillArticleTagsField(tags) {
    await test.step(`Fill the 'Article Tags' field with '${tags}'`, async () => {
      await this.articleTagsField.fill(tags);
      await this.articleTagsField.press('Enter');
    });
  }


  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertArticleRowIsVisible() {
    await test.step(`Assert the article row is visible`, async () => {
      await expect(this.articleRow).toBeVisible();
    });
  }
  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
