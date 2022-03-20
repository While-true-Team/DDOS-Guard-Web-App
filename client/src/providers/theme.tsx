import {FC, useContext, useMemo} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles'

import {ChosenTheme} from './chosenTheme'

export const ThemeProvider: FC = ({children}) => {
    const {theme} = useContext(ChosenTheme)
    const muiTheme = useMemo(() => createThemeHelper(theme), [theme])

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>
            {children}
        </MuiThemeProvider>
    )
}

const brandColor = '#0e26a2'
const createThemeHelper = (theme: 'dark' | 'light') => {
    const isDark = theme === 'dark'
    return createTheme({
        palette: {
            mode: theme,
            background: {
                default: isDark ? '#303030' : '#ffffff',
                paper: isDark ? '#242526' : '#ffffff'
            },
            primary: {
                main: brandColor
            },
            error: {
                main: 'rgb(232, 51, 51)'
            },
            success: {
                main: 'rgb(76,175,80)'
            }
        }
    })
}