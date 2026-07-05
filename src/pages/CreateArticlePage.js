import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleHeader = page.getByPlaceholder("What's this article about");
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async fillArticleTitle(articleTitleText) {
    await test.step(`Fill article title by "${articleTitleText}"`, async () => {
      await this.articleTitle.fill(articleTitleText);
    });
  }

  async fillArticleHeader(articleHeaderText) {
    await test.step(`Fill article header by "${articleHeaderText}"`, 
      async () => {
      await this.articleHeader.fill(articleHeaderText);
    });
  }

  async fillArticleBody(articleBodyText) {
    await test.step(`Fill article body by "${articleBodyText}"`, async () => {
      await this.articleBody.fill(articleBodyText);
    });
  }

  async fillArticleTags(articleTagsText) {
    await test.step(`Fill article tags by "${articleTagsText}"`, async () => {
      await this.articleTags.fill(articleTagsText);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
