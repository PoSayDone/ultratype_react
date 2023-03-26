import React, { FC } from 'react'
import { ThemeContext, themes } from '../contexts/ThemeContext'
interface ThemeProps {
    children?: any
}
const getTheme = () => {
  if (typeof window !== 'undefined') {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (Object.values(themes).includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return themes.light

    return themes.dark
  }
  return themes.dark
}

const ThemeProvider: FC<ThemeProps> = ({ children }) => {
  const [ theme, setTheme ] = React.useState(getTheme)

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider