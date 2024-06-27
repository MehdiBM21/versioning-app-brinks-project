import {createMultiStyleConfigHelpers, extendTheme} from '@chakra-ui/react';
import {mode} from '@chakra-ui/theme-tools';
import {drawerTheme} from './drawer-theme.jsx';
import {menuTheme} from './menu-theme.jsx';


const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

const breakpoints = {
    base: '0px',
    xs: '320px',
    sm: '440px',
    smd: '470px',
    md: '768px',
    lg: '870px',
    sxl: '1030px',
    xl: '1200px',
    '3/2xl': '1560px',
    s2xl: '1775px',
    '2xl': '1920px',
    '3xl': '2120px',
};

const shadows = {
    xs: '-1px 0px 10px rgba(0, 0, 0 , 0.3)',
};

const { definePartsStyle } = createMultiStyleConfigHelpers();

const baseStyle = definePartsStyle({
    overlay: {
        bg: 'transparent',
    },
    dialog: {
        borderRadius: 'md',
        bg: `purple.100`,
    },
});

const zIndices = {
    modal: 1440,
};



const styles = {
    global: (props) => ({
        overlay: {
            bg: 'red',
        },
        dialog: {
            borderRadius: 'md',
            bg: `purple.100`,
        },
        body: {
            bg: mode('white', '#000')(props),
            borderColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
            color: mode('gray.800', 'whiteAlpha.900')(props),
        },
    }),
};

const theme = extendTheme({
    config,
    styles,
    breakpoints,
    shadows,
    baseStyle,
    zIndices,
    colors: {
        custom: {
            bgLight: '#F8F9F9',
            bgDark: '#0F1419',
        },
    },
    components: {
        Menu: menuTheme,
        Drawer: drawerTheme,
    },
});

export default theme;
