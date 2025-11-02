import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleInput = page.getByPlaceholder('Article Title');
    this.aboutInput = page.getByPlaceholder("What's this article about?");
    this.bodyTextArea = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.tagsInput = page.getByPlaceholder('Enter tags');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field with '${title}'`, async () => {
      await this.titleInput.fill(title);
    });
  }

  async fillAboutField(about) {
    await test.step(`Fill the 'About' field with '${about}'`, async () => {
      await this.aboutInput.fill(about);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Body' field with '${body}'`, async () => {
      await this.bodyTextArea.fill(body);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field with '${tags}'`, async () => {
      await this.tagsInput.fill(tags);
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
