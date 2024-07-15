import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Repository from './Repository';
import { Button, Flex, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { RiGitRepositoryCommitsLine } from 'react-icons/ri';
import NewRepoModal from './NewRepoModal';
import useShowToast from '../../hooks/useShowToast';

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/depots');
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepositories();
    console.log(repositories);
  }, []);

  if(repositories.length === 0) {
    return (
      <>
      <Flex alignItems={"center"} gap={3} ml={2}>
      <Text fontWeight={"bold"} fontSize={"2xl"}>Repositories</Text>

      <Button
          background={"rgb(41,144,59)"}
          leftIcon={<RiGitRepositoryCommitsLine size={20}/>}
          size={"sm"}
          mt={2}
          onClick={onOpen}
        >
          New
        </Button>
      </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} h={"100vh"}>
        <Text 
        fontSize={"2xl"}
        fontWeight={"bold"}
        textAlign={"center"}>No repositories found.</Text>
    </Flex>
    <NewRepoModal isOpen={isOpen} onClose={onClose}/>

      </>

    )
  }

  return (
    <Flex flexDir={"column"} gap={4} m={4}>
        <Flex alignItems={"center"} gap={3}>
      <Text fontWeight={"bold"} fontSize={"2xl"}>Repositories</Text>

      <Button
          background={"rgb(41,144,59)"}
          leftIcon={<RiGitRepositoryCommitsLine size={20}/>}
          size={"sm"}
          mt={2}
          onClick={onOpen}
        >
          New
        </Button>
      </Flex>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        {repositories.map((repository) => (
         <GridItem w={'100%'} border={'1px solid'} borderColor={'gray.200'} borderRadius={10}>
          <Repository key={repository.id} repository={repository}/>
          </GridItem>
        ))}
      </Grid>
      <NewRepoModal isOpen={isOpen} onClose={onClose}/>
      </Flex>
      
  );
};

export default Repositories;
