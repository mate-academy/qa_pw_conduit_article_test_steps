import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.whatIsArticleAboutField = page.getByPlaceholder(`What's this article about?`);
    this.writeArticlefield = page.getByPlaceholder('Write your article (in markdown)');
    this.enterTagsField = page.getByPlaceholder('Enter tags');
    this.commentField = page.getByPlaceholder('Write a comment...');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async fillArticleTitleField(articleTitle) {
    await test.step(`Fill Article title field`, async() => {
      await this.articleTitleField.fill(articleTitle);
    });
  }

  async fillWhatIsArticleAboutField(text) {
    await test.step(`Fill what is article about field`, async() => {
      await this.whatIsArticleAboutField.fill(text);
    });
  }

  async fillArticleTextField(text) {
    await test.step(`Write article text`, async() => {
      await this.writeArticlefield.fill(text);
    });
  }

  async fillEnterTagsField(tag) {
    await test.step(`Fill enter tag field`, async() => {
      await this.enterTagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    })
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertCommentFieldPresent() {
    await test.step(`Assert comment field present`, async() => {
      await expect(this.commentField).toBeVisible();
    });
  }
}
