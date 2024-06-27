import { Box, Link, Text, Tooltip } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { RiGitRepositoryFill } from "react-icons/ri";

const Home = () => {
	return (
		<Tooltip
			hasArrow
			label={"Repositories"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"/repositories"}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
<RiGitRepositoryFill size={25} />
<Text display={{ base: "none", md: "block" }} fontWeight={500}>Repositories</Text>
			</Link>
		</Tooltip>
	);
};

export default Home;
