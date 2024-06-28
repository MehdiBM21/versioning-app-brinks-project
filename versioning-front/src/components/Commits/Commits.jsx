import { Button, Flex, Select, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import Files from "../Files/Files";
import NewCommitModal from "./NewCommitModal";
import useShowToast from "../../hooks/useShowToast";

const Commits = () => {
  const { depotId } = useParams();
  const [commitId, setCommitId] = useState(-1);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  console.log(depotId);

  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/commits/depot/" + depotId
        );
        setCommits(response.data);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };

    fetchCommits();
    console.log(commits);
  }, []);

  if (commits.length === 0) {
    return (
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"100vh"}
        gap={3}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          No commits found.
        </Text>
        <Button
          background={"rgb(41,144,59)"}
          leftIcon={<RiGitRepositoryCommitsLine size={20} />}
          onClick={onOpen}
        >
          Add a new Commit
        </Button>
        <NewCommitModal isOpen={isOpen} onClose={onClose} depotId={depotId} />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        flexDir={"column"}
        //   alignItems={"center"}
        //   justifyContent={"center"}
        h={"100vh"}
        m={3}
      >
        <Flex alignItems={"center"} gap={3}>
          <Select
            placeholder='Select a commit'
            onChange={(e) => setCommitId(e.target.value)}
            w={"20%"}
            cursor={"pointer"}
          >
            {commits.map((commit) => (
              <option value={commit?.id}>{commit?.message}</option>
            ))}
          </Select>

          <Button
          background={"rgb(41,144,59)"}
          leftIcon={<RiGitRepositoryCommitsLine size={20} />}
          onClick={onOpen}
        >
          Add 
        </Button>
        </Flex>

        <Files commitId={commitId} />
      </Flex>
      <NewCommitModal isOpen={isOpen} onClose={onClose} depotId={depotId} />
    </>
  );
};

export default Commits;
