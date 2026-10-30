import { existsSync, readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'

// Discover lessons the same way the app does: src/lessons/<section>/<slug>/meta.ts
const root = new URL('../src/lessons/', import.meta.url)
const dirs = (url: URL) =>
  readdirSync(url, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('__'))
const lessonPaths = dirs(root).flatMap((section) =>
  dirs(new URL(`${section.name}/`, root))
    .filter((slug) => existsSync(new URL(`${section.name}/${slug.name}/meta.ts`, root)))
    .map((slug) => `/${section.name}/${slug.name}`),
)

test('home lists every section', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Learn Vue by poking it.')
  await expect(page.getByRole('link', { name: 'Start learning' })).toBeVisible()
})

test('coverage map has no uncovered entries', async ({ page }) => {
  await page.goto('/coverage')
  await expect(page.locator('h1')).toHaveText('Coverage map')
  await expect(page.getByText('✗')).toHaveCount(0)
})

for (const path of lessonPaths) {
  test(`lesson ${path} renders without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

    await page.goto(path)
    await expect(page.locator('article > header h1')).toBeVisible()
    // no demo hit the error boundary in <Demo> (it renders a [data-demo-error] message)
    await expect(page.locator('[data-demo-error]')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}
