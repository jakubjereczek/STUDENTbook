import React, { useContext, useState } from 'react';

const ThemeChangerContext = React.createContext({});

export const useChangerTheme = () => useContext(ThemeChangerContext);

export const ThemeChangerProvider = ({ children }) => {

    const [isLight, setLight] = useState(true);

    const toggleColor = () => setLight(!isLight);

    return (
        <ThemeChangerContext.Provider value={{
            isLight,
            toggleColor
        }}>
            {children}
        </ThemeChangerContext.Provider>
    )
}