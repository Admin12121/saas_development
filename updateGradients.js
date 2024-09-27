const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src'); // Adjust the path to your source directory

function updateGradientSyntax(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedContent = fileContent.replace(/linear-gradient\(([^,]+),([^,]+),([^,]+)\)/g, (match, p1, p2, p3) => {
    return `linear-gradient(${p2.trim()} at ${p1.trim()}, ${p3.trim()})`;
  });

  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

function traverseDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.scss')) {
      updateGradientSyntax(fullPath);
    }
  });
}

traverseDirectory(directoryPath);