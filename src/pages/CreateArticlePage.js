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
      `What's this article about?`,
    );
    this.articleText = page.getByPlaceholder(
      `Write your article (in markdown)`,
    );
    this.articleTag = page.getByPlaceholder(`Enter tags`);
  }

  async waitForOpened() {
    // eslint-disable-next-line max-len
    await test.step(`Wait until the article creation URL is displayed`, async () => {
      await this.page.waitForURL('https://conduit.mate.academy/editor');
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

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.articleTitle.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.articleDescription.fill(description);
    });
  }

  async fillArticleTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.articleText.fill(text);
    });
  }

  async fillArticleTagField(tag) {
    await test.step(`Fill the 'Tag' field`, async () => {
      await this.articleTag.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }
}
