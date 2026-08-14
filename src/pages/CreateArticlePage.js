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

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.page.getByPlaceholder('What\'s this article about?').fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Body' field`, async () => {
      await this.page.getByPlaceholder('Write your article (in markdown)').fill(body);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field`, async () => {
      const tagsField = this.page.getByPlaceholder('Enter tags');
    
      for (const tag of tags) {
        await tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
