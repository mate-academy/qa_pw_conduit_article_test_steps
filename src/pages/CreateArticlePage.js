import { expect, test } from '@playwright/test';

export class CreateArticlePage {
    constructor(page) {
        this.page = page;
        this.publishArticleButton = page.getByRole('button', {
            name: 'Publish Article',
        });
        this.errorMessage = page.getByRole('list').nth(1);
        this.articleTitleField = page.getByPlaceholder('Article Title');
        this.articleDescriptionField = page.getByPlaceholder("What's this article about?");
        this.articleMainTextField = page.getByPlaceholder("Write your article (in markdown)");
        this.articleTagsField = page.getByPlaceholder('Enter tags');
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

    async fillArticleTitleField(inputText) {
        await test.step(`Filling the title field`, async () => {
            await this.articleTitleField.fill(inputText)
        })
    }

    async fillArticleDescriptionField(inputText) {
        await test.step(`Filling the description field`, async () => {
            await this.articleDescriptionField.fill(inputText)
        })
    }

    async fillArticleMainTextField(inputText) {
        await this.articleMainTextField.fill(inputText)
    }

    async fillArticleTagsField(inputText) {
        await this.articleTagsField.fill(inputText)
    }
}
