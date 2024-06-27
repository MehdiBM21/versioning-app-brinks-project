import { Box, Button, Flex, Image, Link, Tooltip, useColorMode } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { BrinksLargeLogoLight, InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import SidebarItems from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";
import brinksLogoLarge from "../../assets/brinks-white.png"
import brinksLogoBlack from "../../assets/brinks-logo-large-black.png"
import brinksLogo from "../../assets/Brinks.svg"
import {MdOutlineWbSunny} from "react-icons/md";
import {FiMoon} from "react-icons/fi";

// import useLogout from "../../hooks/useLogout";

const SideBar = () => {
  const {colorMode, toggleColorMode}=useColorMode()

    const switchMode=(dark,light)=>(colorMode==='dark'?dark:light)
  // const {handleLogout, loading} = useLogout();
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"gray.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
      // background={switchMode('black','#dbdbdb')}
      // color={switchMode('white','black')}
      background={"#2247A4"}
    >
      <Flex direction={"column"} gap={10} w='full' height='full'>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor='pointer'
        >
          {/* <InstagramLogo /> */}
          <Image src={switchMode(brinksLogoLarge, brinksLogoBlack)} width={150}></Image>
          {/* <BrinksLargeLogoLight/> */}
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          w={{ base: 10 }}
          cursor='pointer'
        >
          {/* <InstagramMobileLogo /> */}
          <Image src={brinksLogo} width={150}></Image>

        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Flex fontSize={'14px'} py={4} onClick={toggleColorMode} icon={colorMode==='dark'?<FiMoon size={22}  />:<MdOutlineWbSunny size={23}  />}>
        </Flex>
        
        {/* logout button */}

<Box mt={"auto"}>
<Tooltip
          hasArrow
          label={"Switch appearance"}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}

        >
          <Flex
            // onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
            onClick={toggleColorMode}

          >
          {colorMode==='dark'?<FiMoon size={25}  />:<MdOutlineWbSunny size={25}  />}            
          <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              // isLoading={loading}
            >
              Switch appearance
            </Button>
          </Flex>
        </Tooltip>
        {/* <Tooltip
          hasArrow
          label={"Logout"}
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            // onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              // isLoading={loading}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip> */}
        </Box>

      </Flex>
    </Box>
  );
};

export default SideBar;
