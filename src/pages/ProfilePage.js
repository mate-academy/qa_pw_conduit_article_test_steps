import { expect, test } from '@playwright/test';

export class ProfilePage{
    constructor(page) {
        this.page = page
        this.articleLink = page.locator('div.container').getByRole('heading')
    }

    async open() {
        await test.step('opens profile page', async () => {
            await this.page.goto(`/profile/${process.env.USER_NAME.toLowerCase()}`);
        })
    }

    async assertCreatedArticleExists(articleTitle) {
        await test.step(`assert created article title exists`, async () => {
            await expect(this.articleLink).toContainText(articleTitle)
        })
    }
}