import {Box, Button, Flex, Tooltip, useColorMode, useColorModeValue} from "@chakra-ui/react";
import { MdOutlineWbSunny } from "react-icons/md";
import React, {useEffect} from "react";
import { FiMoon } from "react-icons/fi";
import {BiLogOut} from "react-icons/bi";
export default function Theme() {
    const { toggleColorMode,colorMode } = useColorMode()



    return (
        <>



            <Tooltip
                hasArrow
                label={"Theme"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    cursor="pointer"
                    onClick={toggleColorMode}
                    alignItems={"center"}
                    gap={4}
                    _hover={colorMode==="dark"?{ bg: "whiteAlpha.400" }:{ bg: "blackAlpha.100" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                >
                    {colorMode==="dark"?
                        <>
                            <MdOutlineWbSunny size={27}  />
                            <Button
                                display={{ base: "none", md: "block" }}
                                variant={"ghost"}
                                _hover={{ bg: "transparent" }}
                            >
                                Light
                            </Button>
                        </>:
                        <>
                            <FiMoon size={27}  />
                            <Button
                                display={{ base: "none", md: "block" }}
                                variant={"ghost"}
                                _hover={{ bg: "transparent" }}
                            >
                                Dark
                            </Button>                        </>

                    }



                </Flex>
            </Tooltip>
        </>
    )
}