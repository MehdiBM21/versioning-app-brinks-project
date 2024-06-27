import { Button, Flex, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import Files from "../Files/Files";

const Commits = () => {
  const { depotId } = useParams();
  const [commitId, setCommitId] = useState(-1);
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
        >
          Add a new Commit
        </Button>
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

        <Files commitId={commitId}/>
      </Flex>
    </>
  );
};

export default Commits;
