import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.join(__dirname, 'src'); // Adjust the path to your source directory

let totalFiles = 0;
let processedFiles = 0;
let changedFiles = 0;
let totalChanges = 0;

function updateGradientSyntax(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let changes = 0;

  // Use regex to find and replace outdated gradient syntax in CSS and Tailwind classes
  const updatedContent = fileContent.replace(/linear-gradient\(([^,]+),([^,]+),([^,]+)\)/g, (match, p1, p2, p3) => {
    changes++;
    return `linear-gradient(${p2.trim()} at ${p1.trim()}, ${p3.trim()})`;
  });

  // Check for Tailwind CSS classes with outdated gradient syntax
  const tailwindUpdatedContent = updatedContent.replace(/bg-\[linear-gradient\(([^,]+),([^,]+),([^,]+)\)\]/g, (match, p1, p2, p3) => {
    changes++;
    return `bg-[linear-gradient(${p2.trim()} at ${p1.trim()}, ${p3.trim()})]`;
  });

  // If changes were made, write the updated content back to the file
  if (changes > 0) {
    fs.writeFileSync(filePath, tailwindUpdatedContent, 'utf8');
    changedFiles++;
    totalChanges += changes;
    console.log(`Changed ${filePath} with ${changes} changes`);
  }
}

function traverseDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      traverseDirectory(fullPath); // Recursively traverse subdirectories
    } else if (stat.isFile()) {
      totalFiles++;
      if (fullPath.endsWith('.css') || fullPath.endsWith('.scss') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
        updateGradientSyntax(fullPath);
      }
      processedFiles++;
      process.stdout.write(`\rProcessed ${processedFiles}/${totalFiles} files`);
    }
  });
}

console.time('Processing Time');
traverseDirectory(directoryPath);
console.timeEnd('Processing Time');
console.log(`\nTotal files: ${totalFiles}`);
console.log(`Processed files: ${processedFiles}`);
console.log(`Changed files: ${changedFiles}`);
console.log(`Total changes: ${totalChanges}`);