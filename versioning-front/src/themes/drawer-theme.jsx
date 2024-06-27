import {drawerAnatomy as parts} from '@chakra-ui/anatomy'
import {createMultiStyleConfigHelpers} from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    overlay: {
        bg: 'transparent', //change the background

    },
    dialog: {
        borderRightRadius: 'xl',
        ml:'72px',


        _dark:{
            borderRight: '1px solid',
            bg: 'black',
            borderColor: 'whiteAlpha.400',

        }

    },
    drawerHeader:{
        fontSize: '12px',
    }

})

const breakpoints = {
    base: '0px',
    'xxs':'320px',
    'xs':'400px',
    sm: '440px',
    md: '768px',
    lg: '870px',
    xl: '1200px',
    '2xl': '1920px',
    '3xl': '2120px',
}


export const drawerTheme = defineMultiStyleConfig({
    baseStyle,breakpoints

})