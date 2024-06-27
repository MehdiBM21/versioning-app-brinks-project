import { Box, Image, Link, Tooltip } from "@chakra-ui/react";
import sendMessageWhite from "../../images/sendMessage-white.svg";
import { Link as RouterLink } from "react-router-dom";

const SendMessage = () => {
  return (
    <><Tooltip
    hasArrow
    label={"Send a Message"}
    placement='right'
    ml={1}
    openDelay={500}
    display={{ base: "block", md: "none" }}
>
    <Link
        display={"flex"}
        to={"/chat"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
    >
        <Image src={sendMessageWhite} alt="new Message" />
        <Box display={{ base: "none", md: "block" }}>Messages</Box>
    </Link>
</Tooltip></>
  )
}

export default SendMessage