import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyField = page.getByPlaceholder('Write your article (in');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.writeComment = page.getByPlaceholder('Write a comment...');
  }

  async fillArticleTitleField(articleTitle) {
    await test.step(`Fill the "Article Title" field`, async () => {
      await this.articleTitleField.fill(articleTitle);
    });
  }

  async fillArticleDescriptionField(articleDescription) {
    await test.step(`Fill the "Article Description" field`, async () => {
      await this.articleDescriptionField.fill(articleDescription);
    });
  }

  async fillArticleBodyField(articleBody) {
    await test.step(`Fill the "Article Body" field`, async () => {
      await this.articleBodyField.fill(articleBody);
    });
  }

  async fillArticleTagsField(articleTags) {
    await test.step(`Fill the "Article Tags" field`, async () => {
      await this.articleTagsField.fill(articleTags);
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

  async assertWriteCommentIsVisible() {
    await test.step(`Assert the 'Write a comment' tab is visible`, async () => {
      await expect(this.writeComment).toBeVisible();
    });
  }
}
