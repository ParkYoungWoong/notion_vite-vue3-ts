import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  use: {
    // baseURL: 'http://localhost:3000', // 실제 로컬 서버가 열려있어야 접근 가능합니다!
    baseURL: 'https://enchanting-bublanina-4dd5c6.netlify.app',
    headless: false
  },
  testMatch: 'tests/e2e/**/*.test.ts',
  testDir: 'tests/e2e'
}

export default config
