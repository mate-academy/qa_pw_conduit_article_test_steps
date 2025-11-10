import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?");
    this.articleTextField = page.getByPlaceholder(
      'Write your article (in markdown)');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'Article Description' field`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleTextField(text) {
    await test.step(`Fill the 'Article Text' field`, async () => {
      await this.articleTextField.fill(text);
    });
  }

  async fillArticleTagsField(tag) {
    await test.step(
      `Fill the 'Article Tags' field with tag: ${tag}`,
      async () => {
      await this.articleTagsField.fill(tag);
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
}