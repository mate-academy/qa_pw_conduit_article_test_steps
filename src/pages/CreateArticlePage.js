import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleAbout = page.getByPlaceholder("What's this article about?");
    this.articleText = page
    .getByPlaceholder('Write your article (in markdown)');
    this.articleTag = page.getByPlaceholder('Enter tags');
    this.keyboard = page.keyboard;
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
    await test.step (`Fill an 'Article Title' field`, async () => {
      await this.articleTitle.fill(title);
    
    });
  }

  async fillAboutField(about) {
    await test.step (`Fill an 'About' field`, async () => {
       await this.articleAbout.fill(about);
    });
  }

  async fillArticleTextField(text) {
    await test.step (`Fill an Article Text`, async () => {
      await this.articleText.fill(text);
    });
  }

  async fillArticleTags(tag) {
    await test.step (`Enter tags`, async () => {
      await this.articleTag.click();
      await this.articleTag.fill(tag);
      await this.keyboard.press('Enter');
    });
  }
}
