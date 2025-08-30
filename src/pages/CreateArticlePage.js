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
      `What's this article about?`,
    );
    this.articleTextField = page.getByPlaceholder('Write your article (in');
    this.articleTag = page.getByPlaceholder('Enter tags');
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

  async fillArticleTitle(title) {
    await test.step(`Fill an article title: ${title}`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescription(description) {
    await test.step(`Fill an article description: ${description}`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleText(text) {
    await test.step(`Fill an article text: ${text}`, async () => {
      await this.articleTextField.fill(text);
    });
  }

  async addArticleTag(tag) {
    await test.step(`Add an article tag: ${tag}`, async () => {
      await this.articleTag.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }
}
