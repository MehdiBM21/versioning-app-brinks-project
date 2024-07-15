import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    useColorModeValue,
    VStack,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import useAuthStore from "../../store/authStore";
  import axios from "axios";
  import useShowToast from "../../hooks/useShowToast";
  
  const NewCommitModal = ({ isOpen, onClose, depotId }) => {
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
  
    if (!authUser) {
      setAuthUser({
        username: "user",
        password: "user",
        email: "email@email.com",
      });
    }
  
    const [inputs, setInputs] = useState({
      message: "",
      depotId: depotId,
      username: authUser?.username,
    });
    const [files, setFiles] = useState([]);
  
    const handleFileChange = (e) => {
      setFiles(e.target.files);
    };
  
    const handleSubmit = async (e) => {
      setIsLoading(true);
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("commitRequest", new Blob([JSON.stringify(inputs)], { type: "application/json" }));
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
  
      try {
        const response = await axios.post("http://localhost:8080/api/commits", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsLoading(false);
        showToast("Success", "Commit created successfully!", "success");
        console.log("Response:", response.data);
        onClose();
      } catch (error) {
        setIsLoading(false);
        showToast("Error", "Failed to create commit.", "error");
        console.error("Error creating commit:", error);
      }
    };
  
    return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={{ base: "full", md: "md" }}>
        <ModalOverlay />
        <ModalContent rounded={"xl"} bg={useColorModeValue("white", "#262626")}>
          <ModalCloseButton />
          <ModalBody>
            <VStack py={[1, 6]} px={[0, 4]}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} w={"full"} pb={3}>
                  <Heading fontSize={{ base: "2xl", sm: "3xl" }}>Add new Commit</Heading>
                  <FormControl id="message">
                    <FormLabel>Message:</FormLabel>
                    <Input
                      placeholder="message..."
                      _placeholder={{ color: "gray" }}
                      type="text"
                      value={inputs.message}
                      onChange={(e) => setInputs({ ...inputs, message: e.target.value })}
                    />
                  </FormControl>
                  <FormControl id="files">
                    <FormLabel>Files:</FormLabel>
                    <Input
                      type="file"
                      webkitdirectory="true"
                      multiple
                      onChange={handleFileChange}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={6} direction={["column", "row"]} w={"full"}>
                  <Button
                    color={useColorModeValue("white", "#262626")}
                    bg={useColorModeValue("#262626", "white")}
                    w="full"
                    onClick={onClose}
                    _hover={{
                      _dark: {
                        bg: "whiteAlpha.900",
                      },
                      bg: "black",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"#2247A4"}
                    color={"white"}
                    type="submit"
                    w="full"
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default NewCommitModal;
  