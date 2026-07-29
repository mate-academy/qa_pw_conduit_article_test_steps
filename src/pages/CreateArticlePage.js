import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }
  async fillTitle(title) {
    await test.step(`Fill the 'Article Title' 
      field with '${title}'`, async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillDescription(description) {
    await test.step(`Fill the 'What's this article about?' 
      field with '${description}'`, async () => {
      await this.page
        .getByPlaceholder("What's this article about?")
        .fill(description);
    });
  }

  async fillBody(body) {
    await test.step(`Fill the 'Write your article (in markdown)' 
      field with body text`, async () => {
      await this.page
        .getByPlaceholder('Write your article (in markdown)')
        .fill(body);
    });
  }

  async fillTag(tag) {
    await test.step(`Fill the 'Enter tags' field with '${tag}' 
      and press Enter`, async () => {
      const tagInput = this.page.getByPlaceholder('Enter tags');
      await tagInput.fill(tag);
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
