export const transformFiles = (files) => {
    const fileTree = {};
  
    files.forEach((file) => {
      const pathParts = file.filePath.split('/');
      const fileName = pathParts.pop();
      let currentLevel = fileTree;
  
      pathParts.forEach((part) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part];
      });
  
      currentLevel[fileName] = file;
    });
  
    return fileTree;
  };
  