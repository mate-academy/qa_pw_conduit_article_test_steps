import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(`What's this article about?`);
    this.articleTextField = page.getByPlaceholder('Write your article (in');
    this.articleTagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill the article 'Title' field`, async () => {
      await this.articleTitleField.fill(articleTitle);
    })
  }

  async fillArticleDescription(articleDescription) {
    await test.step(`Fill the 'What's this article about?' field`, async () => {
      await this.articleDescriptionField.fill(articleDescription);
    })
  }

  async fillArticleText(articleText) {
    await test.step(`Fill the 'Write your article' field`, async () => {
      await this.articleTextField.fill(articleText);
    })
  }

  async addArticleTag(tag) {
    await test.step(`Add tag to the article`, async () => {
      await this.articleTagField.fill(tag);
      await this.page.keyboard.press('Enter'); 
    })
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
