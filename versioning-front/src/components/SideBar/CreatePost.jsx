import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);
  const {handleImageChange, selectedFile, setSelectedFile} = usePreviewImg();
  const showToast = useShowToast();
  const {handleCreatePost, isLoading} =useCreatePost();

  const handlePost = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
      
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea placeholder='Post caption...' 
            value={caption} onChange={(e) => setCaption(e.target.value)}/>

            <Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
              onClick={() => imageRef.current.click()}
            />
            {selectedFile && (
                <Flex mt={5} w={"full"} justifyContent={"center"} position={"relative"}>
                    <Image src={selectedFile} alt="post image" />
                    <CloseButton 
                    position={"absolute"}
                    top={2}
                    right={2}
                    onClick={() => setSelectedFile("")}
                    />
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePost} isLoading={isLoading}>Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

