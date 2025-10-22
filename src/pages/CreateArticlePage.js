import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.aboutArticleField = page.getByPlaceholder('What\'s this article about?');
    this.articleTextareaField = page.locator('//form//textarea');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' input field`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillAboutArticleField(description) {
    await test.step(`Fill the 'What's this article about?' input field`, async () => {
      await this.aboutArticleField.fill(description);
    });
  }

  async fillDescriptionArticleField(description) {
    await test.step(`Fill the 'Write your article (in markdown)' textarea field`, async () => {
      await this.articleTextareaField.fill(description);
    });
  }

  async addArticleTags(tags) {
    await test.step(`Add 'Article' tags`, async () => {
      for (const tagName of tags) {
        await this.tagsField.fill(tagName);
        await this.page.keyboard.press('Enter');
      }
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
