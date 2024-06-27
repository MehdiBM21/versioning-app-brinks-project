import { Box, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { RiGitRepositoryLine } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

const Repository = ({repository}) => {
    console.log(repository);
  return (
    <Box borderRadius={10} padding={4}>
        <Flex alignItems={"center"} gap={2}>
            <RiGitRepositoryLine />
            {/* //TODO::add link to go to the repository */}
            <Link to={`/commits/${repository?.id}`} as={RouterLink}>
            <Text fontWeight={500} fontSize={"sm"} color="#4493f8">{repository?.nom}</Text>
            </Link>
        </Flex>
        <Text color={"gray.500"} fontWeight={400}>{repository.description}</Text>
        <Text fontWeight={300}>Owner: {repository?.user?.username}</Text>
    </Box>
  )
}

export default Repository