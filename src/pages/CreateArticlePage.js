import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });

    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder('What\'s this article about?');
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.writeCommentField = page.getByPlaceholder('Write a comment...');
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
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Article Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Article Body' field`, async () => {
      await this.bodyField.fill(body);
    });
  }

  async fillTagField(tag) {
    await test.step(`Fill the 'Article Tag' field with '${tag}' and press Enter`, async () => {
      await this.tagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async addTags(tags) {
    await test.step(`Add tags: ${tags.join(', ')}`, async () => {
      for (const tag of tags) {
        await this.tagField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async assertWriteCommentFieldIsVisible() {
    await test.step(`Assert the 'Write a comment' field is visible`, async () => {
      await expect(this.writeCommentField).toBeVisible();
    });
  }
}
