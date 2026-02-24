import { expect } from '@playwright/test';

export class ProfilePage{
    constructor(page) {
        this.page = page
        this.articleLink = page.locator('div.article-preview').first().locator("a.preview-link")
    }

    async open() {
        await this.page.goto(`/profile/${process.env.USER_NAME.toLowerCase()}`);
    }

    async assertCreatedArticleExists(articleTitle) {
        await expect(this.articleLink).toContainText(articleTitle)
    }
}