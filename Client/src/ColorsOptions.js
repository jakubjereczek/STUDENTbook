import React from 'react';
import { useChangerTheme } from './services/ThemeContext';
import { lightTheme, darkTheme } from './helpers/colors';
import { ThemeProvider } from 'styled-components';


function ColorsOptions({ children }) {

    const changerTheme = useChangerTheme();
    const { isLight } = changerTheme;

    return (
        <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    )
}

export default ColorsOptions;