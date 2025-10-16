import { useTheme } from 'vuetify'

export const useAppTheme = () => {
  const theme = useTheme()
  
  const isDark = computed(() => theme.global.current.value.dark)
  
  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
  
  const setTheme = (themeName: 'light' | 'dark') => {
    theme.global.name.value = themeName
  }
  
  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
