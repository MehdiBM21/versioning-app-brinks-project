import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  StackDivider,
  Text,
  useColorMode,
  VStack,
  Button
} from "@chakra-ui/react";
import axios from "axios";
import { FaRegFile } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import MonacoEditor from "@monaco-editor/react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { MdFolderZip } from "react-icons/md";


const Files = (props) => {
  const [files, setFiles] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const { colorMode } = useColorMode();

  const switchMode = (dark, light) => (colorMode === "dark" ? dark : light);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/files/commit/${props.commitId}`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching Files:", error);
      }
    };

    fetchFiles();
  }, [props]);

  const handleFileClick = async (file) => {
    const fileExtension = file.fileName.split('.').pop().toLowerCase();

    setSelectedFileName(file.fileName);
    setSelectedFileType(fileExtension);
    console.log(file.filePath)

    if (['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      setSelectedFilePath(`http://localhost:8080/api/files/content?filePath=${encodeURIComponent(file.filePath)}`);
      setFileContent(null); // Reset file content for non-text files
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/api/files/text-content?filePath=${encodeURIComponent(file.filePath)}`);
        setFileContent(response.data);
        setSelectedFilePath(null); // Reset file path for text-based files
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    }
  };

  const downloadAllFilesAsZip = async () => {
    const zip = new JSZip();
    const filePromises = files.map(async (file) => {
      const response = await axios.get(`http://localhost:8080/api/files/content?filePath=${encodeURIComponent(file.filePath)}`, { responseType: 'blob' });
      zip.file(file.fileName + props?.commitId, response.data);
    });

    await Promise.all(filePromises);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "files.zip");
  };

  if (files.length === 0) {
    return (
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"100vh"}
        gap={3}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
          Select a Commit
        </Text>
      </Flex>
    );
  }

  return (
    <>
     <Button
          background={"rgb(34,71,164)"}
          leftIcon={<MdFolderZip size={20} />
          }
          w={"fit-content"}
          mt={5}
          onClick={downloadAllFilesAsZip}
        >
          Download All files as ZIP
        </Button>
      <VStack
        display={selectedFileType ? "none" : "block"}
        mt={5}
        w={"90%"}
        background={switchMode("black", "#C0D1FA")}
        border={"1px solid #2247A4"}
        divider={<StackDivider borderColor='#2247A4' />}
        p={2}
        borderRadius={5}
        spacing={2}
        align={"stretch"}
        overflowY={"scroll"}
      >
        {files.map((file) => (
          <Flex
            key={file.id}
            alignItems={"center"}
            gap={3}
            _hover={{ bg: "#9DB2E5" }}
            transition={"all 0.2s ease"}
            p={3}
            borderRadius={5}
            cursor={"pointer"}
            onClick={() => handleFileClick(file)}
          >
            <FaRegFile />
            {file.fileName}
          </Flex>
        ))}
      </VStack>
      {/* <Button onClick={downloadAllFilesAsZip} mt={5}>Download All Files as ZIP</Button> */}
      {selectedFileType && !selectedFilePath && fileContent && (
        <Box
          mt={5}
          p={3}
          background={switchMode("black", "#C0D1FA")}
          border={"1px solid #2247A4"}
          borderRadius={5}
          maxH={"90vh"}
          overflowY={"scroll"}
          overflowX={"hidden"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"} mb={3} >
              {selectedFileName} : 
            </Text>
            <IconButton icon={<IoMdClose size={20}/>} onClick={() => setSelectedFileType(null)} background={"red"}></IconButton>
          </Flex>
          <MonacoEditor
            defaultLanguage="javascript"
            whiteSpace={"pre-wrap"}
            value={fileContent}
            theme={switchMode("vs-dark", "light")}
            options={{
              readOnly: true,
            }}
          ></MonacoEditor>
        </Box>
      )}
      {selectedFileType === 'pdf' && selectedFilePath && (
        <Box
          mt={5}
          p={3}
          background={switchMode("black", "#C0D1FA")}
          border={"1px solid #2247A4"}
          borderRadius={5}
          maxH={"90vh"}
          overflowY={"scroll"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"} mb={3}>
              {selectedFileName} :
            </Text>
            <IconButton icon={<IoMdClose size={20}/>} onClick={() => setSelectedFileType(null)} background={"red"}></IconButton>
          </Flex>
          <embed src={selectedFilePath} width="100%" height="600px" type="application/pdf" />
        </Box>
      )}
      {['jpg', 'jpeg', 'png', 'gif'].includes(selectedFileType) && selectedFilePath && (
        <Box
          mt={5}
          p={3}
          background={switchMode("black", "#C0D1FA")}
          border={"1px solid #2247A4"}
          borderRadius={5}
          maxH={"90vh"}
          overflowY={"scroll"}
        >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"} mb={3}>
              {selectedFileName} : 
            </Text>
            <IconButton icon={<IoMdClose size={20}/>} onClick={() => setSelectedFileType(null)} background={"red"}></IconButton>
          </Flex>
          <Image src={selectedFilePath} alt="Selected File" width="100%" />
        </Box>
      )}
    </>
  );
};

export default Files;
