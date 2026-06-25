import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleAboutField = page.getByPlaceholder(
      "What's this article about?"
    );
    this.articleTextField = page.getByPlaceholder(
      'Write your article (in markdown)'
    ); 
    this.articleTagsField = page.getByPlaceholder(
      'Enter tags'
    );  
    
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  //fillArticleTitleField(title)
  async fillArticleTitleField(title) {
    await test.step(
      `Fill the 'Article Title' field with '${title}'`, 
      async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(
      `Fill the 'Description' field with '${description}'`, 
      async () => {
      await this.articleAboutField.fill(description);
    }); 
  }

  async fillArticleTextField(text) {
    await test.step(
      `Fill the 'Article Text' field with '${text}'`, 
      async () => {
      await this.articleTextField.fill(text);
    }); 
  }

    async fillTagsField(tag) {
    await test.step(
      `Fill the 'Tags' field with '${tag}'`, 
      async () => {
      await this.articleTagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    }); 
  }

  async clickPublishArticleButton() {
    await test.step(
      `Click the 'Publish Article' button`, 
      async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
  await test.step(
    `Assert article title '${title}' is visible`,
    async () => {
      await expect(
        this.page.getByText(`${title}`),
      ).toBeVisible();
    },
  );
}

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await this.errorMessage.waitFor({ state: 'visible' });
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
