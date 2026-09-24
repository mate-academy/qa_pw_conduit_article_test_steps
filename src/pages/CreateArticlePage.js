import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });

    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title')
    this.articleDescription
      = page.getByPlaceholder('What\'s this article about?')
    this.articleBody = page.getByPlaceholder('Write your article (in')
    this.articleTags = page.getByPlaceholder('Enter tags')
  }

  async fillUpArticleTitle(title) {
    await test.step('Fill up article title field', async () => {
      await this.articleTitle.fill(title)
    })
  };

  async fillUpArticleDescription(description) {
    await test.step('Fill up article description field', async () => {
      await this.articleDescription.fill(description)
    })
  };

  async fillUpArticleBody(body) {
    await test.step('Fill up article body field', async () => {
      await this.articleBody.fill(body)
    })
  };

  async fillUpArticleTags(tag) {
    await test.step('Fill up article tags field', async () => {
      await this.articleTags.fill(tag)
      await this.page.keyboard.press('Enter');
    })
  };

  async waitForArticlePageToLoad() {
    await test.step('Wait for article page to load', async () => {
      await this.page.waitForURL(/\/article\/.+/);
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
