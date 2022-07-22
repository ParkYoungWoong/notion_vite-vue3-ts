import { test } from '@playwright/test'

test('새로운 워크스페이스 추가/수정/삭제', async ({ page }) => {
  // 페이지 접속
  await page.goto('/workspaces')
  // 생성
  await page.locator('text=워크스페이스 생성').click()
  // 수정
  await page.locator('input[type="file"]').setInputFiles('assets/hello.jpg')
  await page.locator('.title[contenteditable]').fill('Test title!')
  await page.locator('.content[contenteditable]').fill('Test content!')
  // 삭제
  await page.hover('ul.workspaces li:has-text("Test title!")')
  await page.waitForSelector('ul.workspaces li:has-text("Test title!")', { timeout: 2000 })
  await page.locator('ul.workspaces li:has-text("Test title!") .icon:nth-child(2)').click()
  await page.pause() // 확인!
})
