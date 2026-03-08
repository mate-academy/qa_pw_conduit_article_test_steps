import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.aboutField = page.getByPlaceholder("What's this article about?");
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill Article title field with ${title}`, async () => {
      await this.titleField.fill(title);
    })
  }
  async fillAboutField(aboutText) {
    await test.step(`Fill Article about field with ${aboutText}`, async () => {
      await this.aboutField.fill(aboutText);
    })
  }
  async fillBodyField(bodyText) {
    await test.step(`Fill Article body field with ${bodyText}`, async () => {
      await this.bodyField.fill(bodyText);
    })
  }

  async fillTagsField(tag) {
    await test.step(`Fill Article tags field with ${tag}`, async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    })
  }

}
