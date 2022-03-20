import {FC, createContext, Dispatch, SetStateAction, useEffect} from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useLocalStorage} from '@caldwell619/react-hooks'

type ThemeName = 'dark' | 'light'

interface IChosenTheme {
    theme: ThemeName
    setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const ChosenTheme = createContext<IChosenTheme>({} as IChosenTheme)

export const ChosenThemeProvider: FC = ({children}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {noSsr: true});
    const [theme, setTheme] = useLocalStorage<ThemeName>('theme', prefersDarkMode ? 'dark' : 'light');
    return <ChosenTheme.Provider value={{theme, setTheme}}>{children}</ChosenTheme.Provider>
}

