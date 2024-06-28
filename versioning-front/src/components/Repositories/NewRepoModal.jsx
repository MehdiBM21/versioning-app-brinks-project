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
  
  const NewRepoModal = ({ isOpen, onClose }) => {
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
      nom: "",
      description: "",
      username: authUser?.username,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const depotRequest = {
        nom: inputs.nom,
        description: inputs.description,
        username: inputs.username,
      };
  
      try {
        setIsLoading(true);
        const response = await axios.post("http://localhost:8080/api/depots", depotRequest);
        setIsLoading(false);
        console.log("Depot created successfully:", response.data);
        showToast("Success", "Depot created successfully!", "success");
        onClose();
      } catch (error) {
        showToast("Error", "Error creating depot", "error");
        console.error("Error creating depot:", error);
      }
    };
  
    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent rounded={"xl"} bg={useColorModeValue("white", "#262626")}>
          <ModalCloseButton />
          <ModalBody>
            <VStack py={[1, 6]} px={[0, 4]}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} w={"full"} pb={3}>
                  <Heading fontSize={{ base: "2xl", sm: "3xl" }}>
                    Add new repository
                  </Heading>
  
                  <FormControl id="nom">
                    <FormLabel>Nom:</FormLabel>
                    <Input
                      name="nom"
                      placeholder="Nom..."
                      _placeholder={{ color: "gray" }}
                      type="text"
                      value={inputs.nom}
                      onChange={handleInputChange}
                    />
                  </FormControl>
  
                  <FormControl id="description">
                    <FormLabel>Description:</FormLabel>
                    <Input
                      name="description"
                      placeholder="Description..."
                      _placeholder={{ color: "gray" }}
                      type="text"
                      value={inputs.description}
                      onChange={handleInputChange}
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
  
  export default NewRepoModal;
  