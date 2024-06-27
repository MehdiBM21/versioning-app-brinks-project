import {menuAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers, defineStyle} from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    // define the part you're going to style




    list: {
        // this will style the MenuList component
        py: '2',
        width:'280px',
        borderRadius: 'xl',
        border: 'none',

        bg:'white',
        boxShadow: '-1px 0px 10px rgba(0, 0, 0 , 0.3)',

        _dark:{
            bg:'#262626',

        }

    },
    item: {
        borderRadius: 'md',
        py: '3',
        width:'94%',
        mx: '3%',
        bg: 'transparent',
        _hover: {
            bg: 'blackAlpha.100',
        },
        _focus: {
            bg: 'blackAlpha.100',
        },
        _dark:{
            _hover: {
                bg: 'whiteAlpha.200',
            },
            _focus: {
                bg: 'whiteAlpha.200',
            },
        }
    },


    groupTitle: {
        // this will style the text defined by the title prop
        // in the MenuGroup and MenuOptionGroup components
        textTransform: 'uppercase',
        color: 'white',
        // textAlign: 'center',
        letterSpacing: 'wider',
        opacity: '0.7',
    },
    command: {
        // this will style the text defined by the command
        // prop in the MenuItem and MenuItemOption components
        opacity: '0.8',
        fontFamily: 'mono',
        fontSize: 'sm',
        letterSpacing: 'tighter',
        pl: '4',
    },
    divider: {
        // this will style the MenuDivider component

        borderColor: 'blackAlpha.300',
        _dark:{
            borderColor: 'whiteAlpha.300',

        }
    },

});

// define custom styles
const lg = defineStyle({
    fontSize: 'md',
    my: '1',
});

const xl = defineStyle({
        fontSize: 'md',
    // px: '20',
        width: '280px',

});

const sizes = {
    // apply custom styles to parts
    xl: definePartsStyle({
        item: xl,
        groupTitle: xl,
        command: xl,
    }),
    // define additional sizes or modify existing ones as needed
    lg: definePartsStyle({
        item: lg, // apply the lg style to items
        groupTitle: lg, // apply the lg style to group titles
        command: lg, // apply the lg style to commands
    }),
    // Add more sizes if needed
    // For example:
    // sm: definePartsStyle({
    //     item: sm,
    //     groupTitle: sm,
    //     command: sm,
    // }),
};



// define custom variants


// export the component theme
export const menuTheme = defineMultiStyleConfig({
    baseStyle,
    // sizes,
    defaultProps: {
        // define which size is applied by default
        size: 'lg',
    },
});