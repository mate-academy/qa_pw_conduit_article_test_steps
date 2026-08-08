import { expect, test } from '@playwright/test';


export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.postCommentButton = page.getByRole('button', { name : 'Post Comment' });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDesc = page.getByPlaceholder("What's this article about?");
    this.articleBody = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTags = page.getByPlaceholder('Enter tags');
  }

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill the 'Article Title' field`, async() => {
      await this.articleTitle.fill(articleTitle);
    })
  }

  async fillArticleDesc(articleDesc) {
    await test.step(`Fill the 'Article Description' field`, async() => {
      await this.articleDesc.fill(articleDesc);
    })
  }

  async fillArticleBody(articleBody) {
    await test.step(`Fill the 'Article Body' field`, async() => {
      await this.articleBody.fill(articleBody);
    })
  }

  async fillArticleTags(articleTags) {
    await test.step(`Fill the 'Article Tags' field`, async() => {
      await this.articleTags.fill(articleTags);
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

  async assertPostCommentButtonIsDisplayed() {
    await test.step(`Assert the 'Post Comment Button' is shown`, async () => {
      await expect( this.postCommentButton).toBeVisible();
    });
  }
}
