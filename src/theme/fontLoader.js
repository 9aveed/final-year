import React, { useEffect } from 'react';
import * as Font from 'expo-font';

const GilroyFontLoader = ({ children }) => {
    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'Gilroy-Light': require('../../assets/fonts/Gilroy-Light.otf'),
                'Gilroy-ExtraBold': require('../../assets/fonts/Gilroy-ExtraBold.otf'),
                // Add other font weights and styles here if needed
            });
        }

        loadFont();
    }, []);

    return children;
};

export default GilroyFontLoader;
