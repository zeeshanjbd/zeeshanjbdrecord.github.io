const fs = require('fs');
const path = require('path');

function listFilesRecursively(directory) {
  const files = [];

  function listFiles(dir) {
    const contents = fs.readdirSync(dir);

    contents.forEach((content) => {
      const contentPath = path.join(dir, content);

      if (fs.statSync(contentPath).isDirectory()) {
        listFiles(contentPath);
      } else {
        files.push(contentPath);
      }
    });
  }

  listFiles(directory);

  return files;
}

const folderPath = 'D:/e/'; // Change this to your folder path
const files = listFilesRecursively(folderPath);

const fileNames = files.map((filePath) => path.relative(folderPath, filePath));

const jsonData = JSON.stringify(fileNames, null, 2);

fs.writeFileSync('movies1.json', jsonData, 'utf-8');
