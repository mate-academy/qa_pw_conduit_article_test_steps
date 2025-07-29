import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    //here is my work
    this.editArticleButton = page
      .getByRole('link', {
        name: ' Edit Article',
      })
      .nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleTextField = page.getByPlaceholder('Write your article (in');
    this.articleTagField = page.getByPlaceholder('Enter tags');
    this.createArticleLink = page.getByRole('link', { name: '  New Article' });
    //end
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

  // Here I am working on
  //TODO
  async fillArticleTitle(titleName) {
    await test.step(`fill article title field`, async () => {
      await this.articleTitleField.fill(titleName);
    });
  }

  async fillArticleDescriptionField(subTitle) {
    await test.step(`fill article description field`, async () => {
      await this.articleDescriptionField.fill(subTitle);
    });
  }

  async fillArticleTextField(description) {
    await test.step(`fill article text field`, async () => {
      await this.articleTextField.fill(description);
    });
  }

  async fillArticleTagField(tag) {
    await test.step(`fill article tag field`, async () => {
      await this.articleTagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertEditArticleButtonIsPresented() {
    await test.step(`Assert the 'Edit Article' button 
      is presented on the page`, async () => {
      await expect(this.editArticleButton).toBeVisible();
    });
  }

  // async createNewArticle() {
  //   await test.step(`click on 'New Article' button`, async () => {
  //     await this.createArticleLink.click();
  //   });
  // }
}
