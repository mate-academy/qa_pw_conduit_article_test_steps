import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.articleAboutField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.inputArticleField = page.getByPlaceholder('Write your article (in');
    this.tagsField = page.getByPlaceholder('Enter tags');
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

  async fillTitleField(text) {
    await test.step(`Fill in the article title field`, async () => {
      await this.titleField.fill(text);
    });
  }

  async fillArticleAboutField(text) {
    await test.step(`Fill in the article about field`, async () => {
      await this.articleAboutField.fill(text);
    });
  }

  async fillInputArticleField(text) {
    await test.step(`Fill in the "Write your article" field`, async () => {
      await this.inputArticleField.fill(text);
    });
  }

  async fillTagsField(text) {
    await test.step(`Fill in the "Enter tags" field`, async () => {
      await this.tagsField.fill(text);
      await this.page.keyboard.press('Enter');
    });
  }
}
