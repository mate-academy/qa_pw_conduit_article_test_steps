import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }
  async fillArticleTitle(title) {
    await test.step(`Fill the title field with '${title}'`, async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillArticleDescription(about) {
    await test.step(`Fill the about field with '${about}'`, async () => {
      await this.page.getByPlaceholder("What's this article about?").
      fill(about);
    });
  }

  async fillArticleBody(body) {
    await test.step(`Fill the article body field with '${body}'`, async () => {
      await this.page.getByPlaceholder('Write your article (in markdown)').
      fill(body);
    });
  }

  async fillArticleTags(tags) {
    await test.step(`Fill the article tags field with '${tags}'`, async () => {
      await this.page.getByPlaceholder('Enter tags').fill(tags);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
