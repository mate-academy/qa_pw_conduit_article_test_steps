import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.locator('body')).toContainText(messageText);
    });
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field with '${title}'`, 
      async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'What's this article about?' field with '${description}'`,
      async () => {
        await this.page.getByPlaceholder("What's this article about?").fill(description);
      },
    );
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill the 'Write your article (in markdown)' field with '${body}'`,
      async () => {
        await this.page.getByPlaceholder('Write your article (in markdown)').fill(body);
      },
    );
  }
  async fillArticleTagsField(tags) {
    await test.step(`Fill the 'Enter tags' field with '${tags}'`,
      async () => {
        await this.page.getByPlaceholder('Enter tags').fill(tags);
        await this.page.keyboard.press('Enter');
      }
    );
  }
}
