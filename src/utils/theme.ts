export type Theme = 'dark' | 'light'

const themeStorageKey = 'fluvialert-theme'

export const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark'
}

export const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export const saveTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(themeStorageKey, theme)
}
