import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.enterTags = page.getByPlaceholder('Enter tags');
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

  async fillArticleTitle() {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.articleTitle.fill('Article Title');
    });
  }

  async fillDescriptionArticle() {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.articleDescription.fill('Article Description');
    });
  }

  async fillArticleBody() {
    await test.step(`Fill the 'Article Body' field`, async () => {
      await this.articleBody.fill('Some Text');
    });
  }
  async fillEnterTags() {
    await test.step(`Fill the 'Enter Tags' field`, async () => {
      await this.enterTags.fill('Some Enter Tags');
    });
  }
}
