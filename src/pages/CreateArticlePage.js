import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .nth(1);
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.writeСommentField = page.getByPlaceholder('Write a comment...');
  }

  getArticleTitle(title) {
    return this.page.getByRole('heading', { name: title });
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'What's this article about?' field`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill the 'Write your article (in markdown)' field`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillArticleTagsField(tags) {
    await test.step(`Enter tags' field`, async () => {
      await this.articleTagsField.fill(tags);
      await this.page.keyboard.press('Enter');
    });
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

  async assertWriteСommentFieldIsVisible() {
    await test.step(`Assert the 'Write a comment...' field' is visible`, async () => {
      await expect(this.writeСommentField).toBeVisible();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the 'Article Title' is visible`, async () => {
      await expect(this.getArticleTitle(title)).toBeVisible();
    });
  }

  async assertEditArticleButtonIsVisible() {
    await test.step(`Assert the 'Edit Article Button' is visible`, async () => {
      await expect(this.editArticleButton).toBeVisible();
    });
  }

  async assertArticleTitleContainsText(title) {
    await test.step(`Assert the '${title}' is shown`, async () => {
      await expect(this.getArticleTitle(title)).toContainText(title);
    });
  }
}
