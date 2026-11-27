import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.articleTags = page.locator('.tag-list li');
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

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field with '${title}'`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field with '${description}'`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field with '${text}'`, async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagField(tag) {
    await test.step(`Fill the 'Tag' Field with '${tag}'`, async () => {
      await this.tagField.fill(tag);
    });
  }

  async assertArticleIsCreatedSuccessfully(title, text, tag) {
    await test.step('Assert the article is created successfully', async () => {
      await expect(this.page).toHaveURL(/\/article\/test-article-title/);
      await expect(this.articleTags).toContainText(tag);
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleCreationSuccessfullyWithoutTag(text) {
    await test.step(`Assert the article is created successfully without a tag`, async () => {
      await expect(this.page).toHaveURL(/\/article\/test-article-title/);
      await expect(this.articleTags).toHaveCount(0);
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
