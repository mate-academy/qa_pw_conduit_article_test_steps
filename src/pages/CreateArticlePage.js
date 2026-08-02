import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleAboutField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTagsField = page.getByPlaceholder('Enter tags');
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
    await test.step(`Fill in 'Article Title' field`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleAboutField(aboutText) {
    await test.step(`Fill in 'What is this article about?' field`, async () => {
      await this.articleAboutField.fill(aboutText);
    });
  }

  async fillArticleBodyField(bodyText) {
    await test.step(`Fill in 'Write your article (in markdown)'`, async () => {
      await this.articleBodyField.fill(bodyText);
    });
  }

  async fillArticleTagsField(tag) {
    await test.step(`Fill in 'Enter tags' field`, async () => {
      await this.articleTagsField.fill(tag);
      await this.articleTagsField.press('Enter');
    });
  }
}
