import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: [['html'], ['list', { printSteps: true }]],

    // ОБ'ЄДНАНИЙ БЛОК USE
    use: {
        /* Базовий URL */
        baseURL: 'https://conduit.mate.academy',

        /* Налаштування запуску браузера (SlowMo тут!) */
        launchOptions: {
            slowMo: 2000, // затримка 2 секунди
        },

        /* Трейси та скриншоти */
        trace: 'retain-on-failure',
        // Можна також додати відео, щоб потім переглянути запис
        video: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});