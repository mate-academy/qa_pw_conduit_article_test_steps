import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.whatsThisArticleAboutField = page.getByPlaceholder(
      `What's this article about?`,
    );
    this.writeYourArticleInMarkdownField = page.getByPlaceholder(
      'Write your article (in',
    );
    this.enterTagsField = page.getByPlaceholder('Enter tags');
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

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill article title field`, async () => {
      await this.articleTitleField.fill(articleTitle);
    });
  }

  async fillWhatsThisArticleAboutField(whatsThisArticleAbout) {
    await test.step(`Fill what's this article about field`, async () => {
      await this.whatsThisArticleAboutField.fill(whatsThisArticleAbout);
    });
  }

  async fillWriteYourArticleInMarkdownField(articleInMarkdown) {
    await test.step(`Fill write your article in markdown field`, async () => {
      await this.writeYourArticleInMarkdownField.fill(articleInMarkdown);
    });
  }

  async fillEnterTagsField(tags) {
    await test.step(`Fill enter tags field`, async () => {
      await this.enterTagsField.fill(tags);
    });
  }
}
