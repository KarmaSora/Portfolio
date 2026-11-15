#include <iostream>
#include "fs.h"


FS::FS()
{

    // Read data from disk and put it in the FAT and current_dir
    if (disk.read(FAT_BLOCK, reinterpret_cast<uint8_t *>(fat)) < 0) {
        std::cerr << "Error: Failed to read FAT from disk\n";
    }

    if (disk.read(ROOT_BLOCK, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
        std::cerr << "Error: Failed to read root directory from disk\n";
    }

    if (current_dir[0].file_name[0] == '\0') {
        // Initialize root directory
        for (int i = 0; i < DIR_ENTRIES; i++) {
            memset(&current_dir[i], 0, sizeof(dir_entry));
        }
        current_dir[0].type = TYPE_DIR;
        current_dir[0].first_blk = FAT_EOF;
        std::strncpy(current_dir[0].file_name, ".", sizeof(current_dir[0].file_name));
        current_dir[1].type = TYPE_DIR;
        current_dir[1].first_blk = FAT_EOF;

        std::strncpy(current_dir[1].file_name, "..", sizeof(current_dir[1].file_name));
    }
    current_dir_blk = ROOT_BLOCK;
    //initialize the path to root directory
    pwd_path = "/";

}

FS::~FS()
{

    // Write data to disk
    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t *>(fat)) < 0) {
        std::cerr << "Error: Failed to write FAT to disk\n";
    }

    if (disk.write(ROOT_BLOCK, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
        std::cerr << "Error: Failed to write root directory to disk\n";
    }
    
}

// formats the disk, i.e., creates an empty file system
int
FS::format()
{

    

    // Write FAT to disk
    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t *>(fat)) < 0) {
        std::cerr << "Error: Failed to write FAT to disk\n";
        return -1;
    }

    // Initialize directory: Set all entries to empty
    memset(current_dir, 0, sizeof(current_dir));
    if (disk.write(ROOT_BLOCK, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
        std::cerr << "Error: Failed to write root directory to disk\n";
        return -1;
    }

    //set all disk blocks to be formatted
    for (int i = 0; i < disk.get_no_blocks(); i++) {
        uint8_t buffer[BLOCK_SIZE] = { 0 };
        if (disk.write(i, buffer) < 0) {
            std::cerr << "Error: Failed to write to disk\n";
            return -1;
        }
    }

    // Initialize FAT: Mark all blocks as free
    for (int i = 0; i < FAT_SIZE; ++i) {
        fat[i] = FAT_FREE;
    }
    fat[ROOT_BLOCK] = FAT_EOF; // Root directory block reserved
    fat[FAT_BLOCK] = FAT_EOF;  // FAT block reserved


    return 0;
}

// create <filepath> creates a new file on the disk, the data content is
// written on the following rows (ended with an empty row)
int FS::create(std::string filepath) {

    // Extract the file name and parent path
    std::string filename = filepath.substr(filepath.find_last_of('/') + 1);
    std::string parentDirPath;

    // Determine the parent directory path
    if (filepath.find('/') != std::string::npos) {
        // If the path contains '/', extract the parent path
        parentDirPath = filepath.substr(0, filepath.find_last_of('/'));
    } else {
        // If no '/' is present, assume the current directory
        parentDirPath = pwd_path;
    }

    // Handle edge cases: empty parentDirPath
    if (parentDirPath.empty() && filepath[0] == '/') {
        parentDirPath = "/";
    } else if (parentDirPath.empty()) {
        parentDirPath = pwd_path; // Default to current directory
    }

    // Save the current path for restoration
    std::string originalFilePath = pwd_path;

    // Navigate to the parent directory only if necessary
    if (parentDirPath != pwd_path) {
        if (cd(parentDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory\n";
            return -1;
        }
    }

    // Check if the file name is too long
    if (filename.length() > 55) {
        std::cout << "Error: File name too long\n";
        if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
        return -1;
    }

    // Check if the file already exists
    for (int i = 0; i < DIR_ENTRIES; i++) {
        if (current_dir[i].file_name[0] != '\0' && filename == current_dir[i].file_name) {
            std::cout << "Error: File already exists\n";
            if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
            return -1;
        }
    }

    // Find a free directory entry
    int freeEntryIndex = -1;
    for (int i = 0; i < DIR_ENTRIES; i++) {
        if (current_dir[i].file_name[0] == '\0') {  // Empty entry
            freeEntryIndex = i;
            break;
        }
    }

    if (freeEntryIndex == -1) {
        std::cout << "Error: No space in the current directory\n";
        if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
        return -1;
    }

    // Prepare file content
    uint8_t fileContent[BLOCK_SIZE] = { 0 };
    std::string line;
    std::vector<uint8_t> contentBuffer;  // Buffer to hold file content
    while (std::getline(std::cin, line) && !line.empty()) {
        for (char c : line) contentBuffer.push_back(c);
        contentBuffer.push_back('\n');  // Add newline
    }

    if (contentBuffer.size() > FAT_SIZE * BLOCK_SIZE) {
        std::cout << "Error: File content exceeds disk capacity\n";
        if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
        return -1;
    }

    // Allocate blocks and link them using FAT
    int firstBlock = -1;
    int prevBlock = -1;
    size_t offset = 0;

    while (offset < contentBuffer.size()) {
        // Find a free block
        int freeBlock = -1;
        for (int i = 0; i < FAT_SIZE; i++) {
            if (fat[i] == FAT_FREE) {
                freeBlock = i;
                break;
            }
        }

        if (freeBlock == -1) {
            std::cout << "Error: No free blocks available\n";
            if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
            return -1;
        }

        // Allocate block in FAT
        fat[freeBlock] = FAT_EOF;  // Mark as the last block (for now)
        if (firstBlock == -1) firstBlock = freeBlock;  // Set as the first block
        if (prevBlock != -1) fat[prevBlock] = freeBlock;  // Link previous block

        // Write content to the block
        size_t bytesToWrite = std::min(static_cast<size_t>(BLOCK_SIZE), contentBuffer.size() - offset);
        std::copy(contentBuffer.begin() + offset, contentBuffer.begin() + offset + bytesToWrite, fileContent);
        if (disk.write(freeBlock, fileContent) < 0) {
            std::cerr << "Error: Failed to write to disk\n";
            if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
            return -1;
        }
        offset += bytesToWrite;

        prevBlock = freeBlock;  // Update the previous block
    }

    // Update the directory entry
    dir_entry& newEntry = current_dir[freeEntryIndex];
    std::strncpy(newEntry.file_name, filename.c_str(), sizeof(newEntry.file_name));
    newEntry.size = contentBuffer.size();
    newEntry.first_blk = firstBlock;
    newEntry.type = TYPE_FILE;
    newEntry.access_rights = READ | WRITE;

    // Write updated directory and FAT to disk
    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
        std::cerr << "Error: Failed to write current directory to disk\n";
        if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
        return -1;
    }

    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t *>(fat)) < 0) {
        std::cerr << "Error: Failed to write FAT to disk\n";
        if (parentDirPath != pwd_path) cd(originalFilePath); // Restore original path
        return -1;
    }

    // Restore the original directory unconditionally
    if(cd(originalFilePath) < 0) {
        std::cerr << "Error: Failed to return to the original directory\n";
        return -1;
    }

    return 0;
}


// cat <filepath> reads the content of a file and prints it on the screen
int FS::cat(std::string filepath)
{
    // Extract the file name and parent path
    std::string filename = filepath.substr(filepath.find_last_of('/') + 1);
    std::string parentDirPath;

    // Determine the parent directory path
    if (filepath.find('/') != std::string::npos) {
        parentDirPath = filepath.substr(0, filepath.find_last_of('/'));
    } else {
        parentDirPath = pwd_path;
    }

    // Handle edge cases: empty parentDirPath
    if (parentDirPath.empty() && filepath[0] == '/') {
        parentDirPath = "/";
    } else if (parentDirPath.empty()) {
        parentDirPath = pwd_path; 
    }

    // Save the current path for restoration
    std::string originalPath = pwd_path;

    // Navigate to the parent directory if necessary
    if (parentDirPath != pwd_path) {
        if (cd(parentDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory\n";
            return -1;
        }
    }

    // Locate the file in the current directory
    dir_entry *file = nullptr;
    for (auto &entry : current_dir) {
        if (strcmp(entry.file_name, filename.c_str()) == 0 && entry.type == TYPE_FILE) {
            file = &entry;
            break;
        }
    }
    if (!file) {
        std::cerr << "Error: File not found\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Check read access rights
    if (!(file->access_rights & READ)) {
        std::cerr << "Error: No read access to the file\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Read file content
    int block = file->first_blk;
    while (block != FAT_EOF) {
        uint8_t buffer[BLOCK_SIZE];
        if (disk.read(block, buffer) < 0) {
            std::cerr << "Error: Failed to read block\n";
            if (parentDirPath != pwd_path) cd(originalPath);
            return -1;
        }
        std::cout << std::string(reinterpret_cast<char *>(buffer), BLOCK_SIZE);
        block = fat[block];
    }

    // Restore original directory if needed
    if (parentDirPath != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory\n";
            return -1;
        }
    }

    return 0;
}

// ls lists the content in the currect directory (files and sub-directories)
int
FS::ls()
{
    std::cout << "name\ttype\taccessrights\tsize" << std::endl;
    for (const auto &entry : current_dir) {
        if (entry.file_name[0] != '\0') { // Valid entry
            
            std::cout << entry.file_name << "\t";
            if (entry.type == TYPE_FILE) std::cout << "file\t";
            else std::cout << "dir\t";
            
            if (entry.access_rights & READ) std::cout << "r";
            else std::cout << "-";
            if (entry.access_rights & WRITE) std::cout << "w";
            else std::cout << "-";
            if (entry.access_rights & EXECUTE) std::cout << "x";
            else std::cout << "-";
            std::cout << "\t\t" << entry.size << std::endl;
        }
        
    }
    //Skapa en vector som innehåller alla filer och subdirectories i headerfilen
    //När vi skapar ny directory (mkdir) så lägger vi filnamnet i root directory men filerna 
    //vi skapar där skapar vi i en ny block (för att inte overwrita root directory)
    return 0;
}
// cp <sourcepath> <destpath> makes an exact copy of the file
// <sourcepath> to a new file <destpath>
int FS::cp(std::string sourcepath, std::string destpath) {
    if (destpath == sourcepath) {
        std::cerr << "Error: Source and destination paths are the same\n";
        return -1;
    }

    // Save the current working directory
    std::string originalPath = pwd_path;

    // Step 1: Navigate to the source directory
    std::string sourceFileName = sourcepath.substr(sourcepath.find_last_of('/') + 1);
    std::string sourceDirPath = sourcepath.find('/') != std::string::npos
    ? sourcepath.substr(0, sourcepath.find_last_of('/'))
    : pwd_path;

    if (sourceDirPath != pwd_path && cd(sourceDirPath) < 0) {
        std::cerr << "Error: Failed to navigate to the source directory\n";
        return -1;
    }

    // Step 2: Locate the source file
    dir_entry* sourceFile = nullptr;
    for (auto& entry : current_dir) {
        if (strcmp(entry.file_name, sourceFileName.c_str()) == 0 && entry.type == TYPE_FILE) {
            sourceFile = &entry;
            break;
        }
    }
    if (!sourceFile) {
        std::cerr << "Error: Source file not found\n";
        cd(originalPath); // Restore original path
        return -1;
    }

    // Step 3: Read the content of the source file
    std::vector<uint8_t> contentBuffer;
    int block = sourceFile->first_blk;
    while (block != FAT_EOF) {
        uint8_t buffer[BLOCK_SIZE];
        if (disk.read(block, buffer) < 0) {
            std::cerr << "Error: Failed to read block\n";
            cd(originalPath);
            return -1;
        }
        contentBuffer.insert(contentBuffer.end(), buffer, buffer + BLOCK_SIZE);
        block = fat[block];
    }



    // Step 4: Restore the original directory
    if (cd(originalPath) < 0) {
        std::cerr << "Error: Failed to return to the original directory\n";
        return -1;
    }
    dir_entry temp = *sourceFile;

    // Step 5: Navigate to the destination directory
    std::string destFileName;
    std::string destDirPath;
    if(destpath == ".."){
        destpath = pwd_path.substr(pwd_path.find_last_of('/')+1);
        destDirPath = pwd_path.find('/') != std::string::npos 
        ? pwd_path.substr(0, pwd_path.find_last_of('/'))
        : pwd_path;
        destFileName = sourceFileName;
    }else{

        destFileName = destpath.substr(destpath.find_last_of('/') + 1);
        destDirPath = destpath.find('/') != std::string::npos
        ? destpath.substr(0, destpath.find_last_of('/'))
        : pwd_path;
    }

    if (destDirPath != pwd_path && cd(destDirPath) < 0) {
        std::cerr << "Error: Failed to navigate to the destination directory\n";
        return -1;
    }

    // Step 6: Check for existing destination file
    for (const auto& entry : current_dir) {

        if(strcmp(entry.file_name, destFileName.c_str()) == 0 && entry.type == TYPE_DIR){
            
            cd(destFileName);   
            destFileName = sourceFileName;     
            }


        if (strcmp(entry.file_name, destFileName.c_str()) == 0 && entry.type == TYPE_FILE) {
            std::cerr << "Error: Destination file already exists\n";
            cd(originalPath);
            return -1;
        }
    }

    // Step 7: Allocate blocks for the destination file
    int firstBlock = -1;
    int prevBlock = -1;
    size_t offset = 0;

    while (offset < contentBuffer.size()) {
        int freeBlock = -1;
        for (int i = 0; i < FAT_SIZE; ++i) {
            if (fat[i] == FAT_FREE) {
                freeBlock = i;
                break;
            }
        }
        if (freeBlock == -1) {
            std::cerr << "Error: No free blocks available\n";
            cd(originalPath);
            return -1;
        }

        fat[freeBlock] = FAT_EOF; // Mark as the last block
        if (prevBlock != -1) fat[prevBlock] = freeBlock;
        if (firstBlock == -1) firstBlock = freeBlock;

        size_t bytesToWrite = std::min(static_cast<size_t>(BLOCK_SIZE), contentBuffer.size() - offset);
        if (disk.write(freeBlock, contentBuffer.data() + offset) < 0) {
            std::cerr << "Error: Failed to write to disk\n";
            cd(originalPath);
            return -1;
        }
        offset += bytesToWrite;
        prevBlock = freeBlock;
    }

    // Step 8: Create a new directory entry
    for (auto& entry : current_dir) {
        if (entry.file_name[0] == '\0') { // Find a free slot
            std::strncpy(entry.file_name, destFileName.c_str(), sizeof(entry.file_name));
            entry.size = temp.size; // Correctly copy the size from the source file
            entry.first_blk = firstBlock; // Set the first block of the copied file
            entry.type = TYPE_FILE;       // Set the file type
            entry.access_rights = temp.access_rights; // Preserve access rights
            break;
        }
    }



    // Step 9: Update FAT and directory
    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t*>(fat)) < 0 ||
        disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update disk structures\n";
        cd(originalPath);
        return -1;
    }

    // Step 10: Restore the original working directory
    if (cd(originalPath) < 0) {
        std::cerr << "Error: Failed to return to the original directory\n";
        return -1;
    }

    return 0;
}
int FS::mv(std::string sourcepath, std::string destpath) {
    if (destpath == sourcepath) {
        std::cerr << "Error: Source and destination paths are the same\n";
        return -1;
    }

    // Save the original working directory
    std::string originalPath = pwd_path;

    // --- Handle source path ---
    std::string sourceFileName = sourcepath.substr(sourcepath.find_last_of('/') + 1);
    std::string sourceDirPath;
    if (sourcepath.find('/') != std::string::npos) {
        sourceDirPath = sourcepath.substr(0, sourcepath.find_last_of('/'));
    } else {
        sourceDirPath = pwd_path;
    }

    if (sourceDirPath.empty() && sourcepath[0] == '/') {
        sourceDirPath = "/";
    } else if (sourceDirPath.empty()) {
        sourceDirPath = pwd_path; 
    }

    // Navigate to source directory if necessary
    if (sourceDirPath != pwd_path) {
        if (cd(sourceDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the source directory\n";
            return -1;
        }
    }

    // Locate the source file
    dir_entry* sourceFile = nullptr;
    for (auto& entry : current_dir) {
        if (strcmp(entry.file_name, sourceFileName.c_str()) == 0 && entry.type == TYPE_FILE) {
            sourceFile = &entry;
            break;
        }
    }
    if (!sourceFile) {
        std::cerr << "Error: Source file not found\n";
        if (sourceDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Save source file info
    dir_entry temp = *sourceFile;

    // Remove the source file entry
    std::memset(sourceFile, 0, sizeof(dir_entry));

    // Write changes to disk for the source directory
    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update source directory\n";
        if (sourceDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t*>(fat)) < 0) {
        std::cerr << "Error: Failed to update FAT\n";
        if (sourceDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Return to the original directory
    if (sourceDirPath != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory after removing source file\n";
            return -1;
        }
    }

    // --- Handle destination path ---
    std::string destFileName = destpath.substr(destpath.find_last_of('/') + 1);
    std::string destDirPath;
    if (destpath.find('/') != std::string::npos) {
        destDirPath = destpath.substr(0, destpath.find_last_of('/'));
    } else {
        destDirPath = pwd_path;
    }

    if (destDirPath.empty() && destpath[0] == '/') {
        destDirPath = "/";
    } else if (destDirPath.empty()) {
        destDirPath = pwd_path;
    }

    // Navigate to destination directory if necessary
    if (destDirPath != pwd_path) {
        if (cd(destDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the destination directory\n";
            return -1;
        }
    }

    // Check if destination is a directory
    bool destinationExists = false;
    bool destinationIsDirectory = false;
    for (auto &entry : current_dir) {
        if (strcmp(entry.file_name, destFileName.c_str()) == 0 && entry.file_name[0] != '\0') {
            destinationExists = true;
            if (entry.type == TYPE_DIR) {
                destinationIsDirectory = true;
            }
            break;
        }
    }

    if (destinationIsDirectory) {
        // If destination is a directory, place the file inside it using the source filename
        if (cd(destFileName) < 0) {
            std::cerr << "Error: Failed to navigate into the destination directory\n";
            // We are currently in destDirPath, cd failed
            // Try to cd back to originalPath (though we never left destDirPath)
            if (destDirPath != pwd_path) cd(originalPath);
            return -1;
        }
        // Now we're inside that directory
        destFileName = temp.file_name;
        destinationExists = false;
        for (auto &entry : current_dir) {
            if (strcmp(entry.file_name, destFileName.c_str()) == 0) {
                destinationExists = true;
                break;
            }
        }
    } else if (destinationExists) {
        // Destination is a file and it already exists, cannot overwrite
        std::cerr << "Error: Destination file already exists\n";
        if (destDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    if (destinationExists) {
        // This would only happen if the directory scenario was handled incorrectly, but let's be safe
        std::cerr << "Error: Destination file already exists\n";
        if (destDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Find a free directory entry in the destination directory
    int freeEntryIndex = -1;
    for (int i = 0; i < DIR_ENTRIES; i++) {
        if (current_dir[i].file_name[0] == '\0') {
            freeEntryIndex = i;
            break;
        }
    }
    if (freeEntryIndex == -1) {
        std::cerr << "Error: No space in the destination directory\n";
        // Try to return to original path
        if (pwd_path != originalPath) cd(originalPath);
        return -1;
    }

    // Create the new entry in the destination
    dir_entry &newEntry = current_dir[freeEntryIndex];
    std::strncpy(newEntry.file_name, destFileName.c_str(), sizeof(newEntry.file_name));
    newEntry.size = temp.size;
    newEntry.first_blk = temp.first_blk;
    newEntry.type = TYPE_FILE;
    newEntry.access_rights = temp.access_rights;

    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update destination directory\n";
        if (pwd_path != originalPath) cd(originalPath);
        return -1;
    }

    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t*>(fat)) < 0) {
        std::cerr << "Error: Failed to update FAT\n";
        if (pwd_path != originalPath) cd(originalPath);
        return -1;
    }

    // Return to the original directory if needed
    if (pwd_path != originalPath) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory\n";
            return -1;
        }
    }

    return 0;
}

int FS::rm(std::string filepath)
{
    // Extract the file name and parent path
    std::string filename = filepath.substr(filepath.find_last_of('/') + 1);
    std::string parentDirPath;

    if (filepath.find('/') != std::string::npos) {
        parentDirPath = filepath.substr(0, filepath.find_last_of('/'));
    } else {
        parentDirPath = pwd_path;
    }

    if (parentDirPath.empty() && filepath[0] == '/') {
        parentDirPath = "/";
    } else if (parentDirPath.empty()) {
        parentDirPath = pwd_path; 
    }

    std::string originalPath = pwd_path;

    // Navigate to the parent directory
    if (parentDirPath != pwd_path) {
        if (cd(parentDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory\n";
            return -1;
        }
    }

    // Locate the file
    dir_entry* file = nullptr;
    for (auto& entry : current_dir) {
        if (std::strcmp(entry.file_name, filename.c_str()) == 0 && entry.type == TYPE_FILE) {
            file = &entry;
            break;
        }
    }
    if (!file) {
        std::cerr << "Error: File not found\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    // Free blocks in FAT and clear data
    int block = file->first_blk;
    uint8_t buffer[BLOCK_SIZE] = {0};
    while (block != FAT_EOF) {
        if (block < 0 || block >= FAT_SIZE) {
            std::cerr << "Error: Invalid block index " << block << "\n";
            if (parentDirPath != pwd_path) cd(originalPath);
            return -1;
        }

        int nextBlock = fat[block];
        fat[block] = FAT_FREE;

        if (disk.write(block, buffer) < 0) {
            std::cerr << "Error: Failed to clear block " << block << "\n";
            if (parentDirPath != pwd_path) cd(originalPath);
            return -1;
        }

        block = nextBlock;
    }

    // Clear the directory entry
    std::memset(file, 0, sizeof(dir_entry));

    // Write updated directory and FAT to disk
    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update directory\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }
    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t*>(fat)) < 0) {
        std::cerr << "Error: Failed to update FAT\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    if (parentDirPath != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory\n";
            return -1;
        }
    }

    return 0;
}


int FS::append(std::string filepath1, std::string filepath2)
{
    // Save the original working directory
    std::string originalPath = pwd_path;

    // -----------------------
    // Handle filepath1 (source file)
    // -----------------------
    std::string filename1 = filepath1.substr(filepath1.find_last_of('/') + 1);
    std::string parentDirPath1;
    if (filepath1.find('/') != std::string::npos) {
        parentDirPath1 = filepath1.substr(0, filepath1.find_last_of('/'));
    } else {
        parentDirPath1 = pwd_path;
    }

    if (parentDirPath1.empty() && filepath1[0] == '/') {
        parentDirPath1 = "/";
    } else if (parentDirPath1.empty()) {
        parentDirPath1 = pwd_path; 
    }

    // cd to parentDirPath1 if necessary
    if (parentDirPath1 != pwd_path) {
        if (cd(parentDirPath1) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory of file1\n";
            return -1;
        }
    }

    // Locate file1 in the current directory
    dir_entry* file1 = nullptr;
    for (auto& entry : current_dir) {
        if (strcmp(entry.file_name, filename1.c_str()) == 0 && entry.type == TYPE_FILE) {
            file1 = &entry;
            break;
        }
    }
    if (!file1) {
        std::cerr << "Error: File1 not found\n";
        if (parentDirPath1 != pwd_path) cd(originalPath);
        return -1;
    }

    // Check read access on file1
    if (!(file1->access_rights & READ)) {
        std::cerr << "Error: No read access to file1\n";
        if (parentDirPath1 != pwd_path) cd(originalPath);
        return -1;
    }

    // Read file1 content
    std::vector<uint8_t> contentBuffer;
    {
        int block = file1->first_blk;
        size_t bytesToRead = file1->size; // Only read actual file size
        while (block != FAT_EOF && bytesToRead > 0) {
            uint8_t buffer[BLOCK_SIZE];
            if (disk.read(block, buffer) < 0) {
                std::cerr << "Error: Failed to read block from file1\n";
                if (parentDirPath1 != pwd_path) cd(originalPath);
                return -1;
            }

            size_t bytesThisBlock = std::min(static_cast<size_t>(BLOCK_SIZE), bytesToRead);
            contentBuffer.insert(contentBuffer.end(), buffer, buffer + bytesThisBlock);
            bytesToRead -= bytesThisBlock;
            block = fat[block];
        }
    }

    // Return to original directory before handling file2
    if (parentDirPath1 != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory after reading file1\n";
            return -1;
        }
    }

    // -----------------------
    // Handle filepath2 (destination file)
    // -----------------------
    std::string filename2 = filepath2.substr(filepath2.find_last_of('/') + 1);
    std::string parentDirPath2;
    if (filepath2.find('/') != std::string::npos) {
        parentDirPath2 = filepath2.substr(0, filepath2.find_last_of('/'));
    } else {
        parentDirPath2 = pwd_path;
    }

    if (parentDirPath2.empty() && filepath2[0] == '/') {
        parentDirPath2 = "/";
    } else if (parentDirPath2.empty()) {
        parentDirPath2 = pwd_path; 
    }

    // cd to parentDirPath2 if necessary
    if (parentDirPath2 != pwd_path) {
        if (cd(parentDirPath2) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory of file2\n";
            return -1;
        }
    }

    // Locate file2 in the current directory
    dir_entry* file2 = nullptr;
    for (auto& entry : current_dir) {
        if (strcmp(entry.file_name, filename2.c_str()) == 0 && entry.type == TYPE_FILE) {
            file2 = &entry;
            break;
        }
    }
    if (!file2) {
        std::cerr << "Error: File2 not found\n";
        if (parentDirPath2 != pwd_path) cd(originalPath);
        return -1;
    }

    // Check write access on file2
    if (!(file2->access_rights & WRITE)) {
        std::cerr << "Error: No write access to file2\n";
        if (parentDirPath2 != pwd_path) cd(originalPath);
        return -1;
    }

    // Append contentBuffer to file2
    // Find the last block of file2
    if (file2->first_blk == FAT_EOF) {
        // If file2 is empty, we'll allocate a new block
        file2->first_blk = FAT_EOF; 
    }

    int lastBlock = file2->first_blk;
    if (lastBlock == FAT_EOF) {
        // The file is empty, no last block yet
        lastBlock = -1;
    } else {
        while (fat[lastBlock] != FAT_EOF) {
            lastBlock = fat[lastBlock];
        }
    }

    size_t offset = 0;
    size_t bytesRemaining = contentBuffer.size();

    // If file is empty (lastBlock == -1), we need to allocate the first block
    if (lastBlock == -1 && bytesRemaining > 0) {
        int freeBlock = -1;
        for (int i = 0; i < FAT_SIZE; i++) {
            if (fat[i] == FAT_FREE) {
                freeBlock = i;
                break;
            }
        }
        if (freeBlock == -1) {
            std::cerr << "Error: No free blocks available\n";
            if (parentDirPath2 != pwd_path) cd(originalPath);
            return -1;
        }
        fat[freeBlock] = FAT_EOF;
        file2->first_blk = freeBlock;
        lastBlock = freeBlock;

        size_t bytesToWrite = std::min(static_cast<size_t>(BLOCK_SIZE), bytesRemaining);
        uint8_t buffer[BLOCK_SIZE] = {0};
        std::copy(contentBuffer.begin() + offset, contentBuffer.begin() + offset + bytesToWrite, buffer);
        if (disk.write(freeBlock, buffer) < 0) {
            std::cerr << "Error: Failed to write to disk\n";
            if (parentDirPath2 != pwd_path) cd(originalPath);
            return -1;
        }
        offset += bytesToWrite;
        bytesRemaining -= bytesToWrite;
        file2->size += bytesToWrite;
    }

    // Append remaining data
    while (bytesRemaining > 0) {
        // Allocate a new block
        int freeBlock = -1;
        for (int i = 0; i < FAT_SIZE; i++) {
            if (fat[i] == FAT_FREE) {
                freeBlock = i;
                break;
            }
        }
        if (freeBlock == -1) {
            std::cerr << "Error: No free blocks available\n";
            if (parentDirPath2 != pwd_path) cd(originalPath);
            return -1;
        }

        fat[freeBlock] = FAT_EOF;
        if (lastBlock != -1 && lastBlock != FAT_EOF) fat[lastBlock] = freeBlock;
        lastBlock = freeBlock;

        size_t bytesToWrite = std::min(static_cast<size_t>(BLOCK_SIZE), bytesRemaining);
        uint8_t buffer[BLOCK_SIZE] = {0};
        std::copy(contentBuffer.begin() + offset, contentBuffer.begin() + offset + bytesToWrite, buffer);
        if (disk.write(freeBlock, buffer) < 0) {
            std::cerr << "Error: Failed to write to disk\n";
            if (parentDirPath2 != pwd_path) cd(originalPath);
            return -1;
        }
        offset += bytesToWrite;
        bytesRemaining -= bytesToWrite;
        file2->size += bytesToWrite;
    }

    // Write updated directory and FAT to disk
    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update directory\n";
        if (parentDirPath2 != pwd_path) cd(originalPath);
        return -1;
    }
    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t*>(fat)) < 0) {
        std::cerr << "Error: Failed to update FAT\n";
        if (parentDirPath2 != pwd_path) cd(originalPath);
        return -1;
    }

    // cd back to original directory if needed
    if (parentDirPath2 != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory\n";
            return -1;
        }
    }

    return 0;
}

// mkdir <dirpath> creates a new sub-directory with the name <dirpath>
// in the current directory
int FS::mkdir(std::string dirpath) {
    // Extract the directory name and parent path
    std::string filename = dirpath.substr(dirpath.find_last_of('/') + 1);
    std::string parentDirPath;

    // Determine the parent directory path
    if (dirpath.find('/') != std::string::npos) {
        // If the path contains '/', extract the parent path
        parentDirPath = dirpath.substr(0, dirpath.find_last_of('/'));
    } else {
        // If no '/' is present, assume the current directory
        parentDirPath = pwd_path;
    }

    // Handle edge cases: empty parentDirPath
    if (parentDirPath.empty() && dirpath[0] == '/') {
        parentDirPath = "/";
    } else if (parentDirPath.empty()) {
        parentDirPath = pwd_path; // Default to current directory
    }

    // Save the current path for restoration
    std::string currentFilePath = pwd_path;

    // Navigate to the parent directory only if necessary
    if (parentDirPath != pwd_path) {
        if (cd(parentDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory\n";
            return -1;
        }
    }

    // Check if the directory name is too long
    if (filename.length() > 55) {
        std::cerr << "Error: Directory name too long\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    // Check if the directory already exists
    for (int i = 0; i < DIR_ENTRIES; i++) {
        if (current_dir[i].file_name[0] != '\0' && filename == current_dir[i].file_name) {
            std::cerr << "Error: Directory already exists\n";
            cd(currentFilePath); // Restore original path
            return -1;
        }
    }

    // Find a free directory entry
    int freeEntryIndex = -1;
    for (int i = 0; i < DIR_ENTRIES; i++) {
        if (current_dir[i].file_name[0] == '\0') {  // Empty entry
            freeEntryIndex = i;
            break;
        }
    }

    if (freeEntryIndex == -1) {
        std::cerr << "Error: No space in the current directory\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    // Find a free block for the new directory
    int freeBlock = -1;
    for (int i = 0; i < FAT_SIZE; i++) {
        if (fat[i] == FAT_FREE) {
            freeBlock = i;
            break;
        }
    }
    if (freeBlock == -1) {
        std::cerr << "Error: No free blocks available\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    // Update the directory entry
    dir_entry& newEntry = current_dir[freeEntryIndex];
    std::strncpy(newEntry.file_name, filename.c_str(), sizeof(newEntry.file_name));
    newEntry.size = 0;
    newEntry.first_blk = freeBlock;
    newEntry.type = TYPE_DIR;
    newEntry.access_rights = READ | WRITE;

    // Initialize the new directory block
    dir_entry newDir[DIR_ENTRIES];
    for (int i = 0; i < DIR_ENTRIES; i++) {
        memset(&newDir[i], 0, sizeof(dir_entry));
    }
    std::strncpy(newDir[0].file_name, ".", sizeof(newDir[0].file_name));
    std::strncpy(newDir[1].file_name, "..", sizeof(newDir[1].file_name));
    newDir[0].type = TYPE_DIR;
    newDir[1].type = TYPE_DIR;
    newDir[0].first_blk = freeBlock;  // Reference to itself
    newDir[1].first_blk = current_dir_blk;  // Reference to the parent directory

    // Write the new directory block to disk
    if (disk.write(freeBlock, reinterpret_cast<uint8_t *>(newDir)) < 0) {
        std::cerr << "Error: Failed to write new directory block to disk\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    // Reserve the block in FAT
    fat[freeBlock] = FAT_EOF;

    // Write the updated current directory and FAT to disk
    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
        std::cerr << "Error: Failed to write current directory to disk\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    if (disk.write(FAT_BLOCK, reinterpret_cast<uint8_t *>(fat)) < 0) {
        std::cerr << "Error: Failed to write FAT to disk\n";
        cd(currentFilePath); // Restore original path
        return -1;
    }

    // Restore the original directory only if we navigated away
    if(cd(currentFilePath) < 0) {
        std::cerr << "Error: Failed to return to the original directory\n";
        return -1;
    }


    return 0;
}


// cd <dirpath> changes the current (working) directory to the directory named <dirpath>
int FS::cd(std::string dirpath) {

    if (dirpath.empty()) {
        // Go back to root directory
        current_dir_blk = ROOT_BLOCK;
        if (disk.read(current_dir_blk, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
            std::cerr << "Error: Failed to read root directory from disk\n";
            return -1;
        }
        pwd_path = "/";
        return 0;
    }

    std::vector<std::string> components;
    if (dirpath[0] == '/') {
        // Absolute path
        components = split_path(dirpath);
        current_dir_blk = ROOT_BLOCK;
        if (disk.read(current_dir_blk, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
            std::cerr << "Error: Failed to read root directory from disk\n";
            return -1;
        }
        pwd_path = "/";
    } else {
        // Relative path
        components = split_path(dirpath);
    }

    if (!navigate_to_directory(components)) {
        std::cerr << "Error: Directory not found\n";
        return -1;
    }

    // Update pwd_path
    for (const auto& component : components) {
        if (component == "..") {
            if (!pwd_path.empty() && pwd_path != "/") {
                pwd_path = pwd_path.substr(0, pwd_path.find_last_of('/'));
                if (pwd_path.empty()) pwd_path = "/";
            }
        } else if (component != "." && !component.empty()) {
            if (pwd_path == "/") {
                pwd_path += component;
            } else {
                pwd_path += "/" + component;
            }
        }
    }

    return 0;
}


// Helper function to split a path into components
std::vector<std::string> FS::split_path(const std::string& path) {
    std::vector<std::string> components;
    std::string component;
    std::istringstream stream(path);
    while (std::getline(stream, component, '/')) {
        if (!component.empty()) {
            components.push_back(component);
        }
    }
    return components;
}

// Helper function to navigate to a directory given its path components
bool FS::navigate_to_directory(const std::vector<std::string>& components) {
    int original_dir_blk = current_dir_blk;
    dir_entry original_dir[DIR_ENTRIES];
    std::memcpy(original_dir, current_dir, sizeof(current_dir));

    for (const auto& component : components) {
        if (component == "..") {
            // Navigate to the parent directory
            for (auto &entry : current_dir) {
                if (strcmp(entry.file_name, "..") == 0) {
                    current_dir_blk = entry.first_blk;
                    break;
                }
            }
        } else {
            // Navigate to the specified subdirectory
            bool found = false;
            for (auto &entry : current_dir) {
                if (strcmp(entry.file_name, component.c_str()) == 0 && entry.type == TYPE_DIR) {
                    current_dir_blk = entry.first_blk;
                    found = true;
                    break;
                }
            }
            if (!found) {
                std::memcpy(current_dir, original_dir, sizeof(current_dir));
                current_dir_blk = original_dir_blk;
                return false;
            }
        }

        // Read the new directory block
        if (disk.read(current_dir_blk, reinterpret_cast<uint8_t *>(current_dir)) < 0) {
            std::memcpy(current_dir, original_dir, sizeof(current_dir));
            current_dir_blk = original_dir_blk;
            return false;
        }
    }
    return true;
}

// pwd prints the full path, i.e., from the root directory, to the current
// directory, including the currect directory name
int
FS::pwd() {
    std::cout << pwd_path << std::endl;

    return 0;
}
// chmod <accessrights> <filepath> changes the access rights for the
int FS::chmod(std::string accessrights, std::string filepath)
{
    // Extract file name and parent dir
    std::string filename = filepath.substr(filepath.find_last_of('/') + 1);
    std::string parentDirPath;
    if (filepath.find('/') != std::string::npos) {
        parentDirPath = filepath.substr(0, filepath.find_last_of('/'));
    } else {
        parentDirPath = pwd_path;
    }

    if (parentDirPath.empty() && filepath[0] == '/') {
        parentDirPath = "/";
    } else if (parentDirPath.empty()) {
        parentDirPath = pwd_path;
    }

    std::string originalPath = pwd_path;

    if (parentDirPath != pwd_path) {
        if (cd(parentDirPath) < 0) {
            std::cerr << "Error: Failed to navigate to the parent directory\n";
            return -1;
        }
    }

    dir_entry *file = nullptr;
    for (auto &entry : current_dir) {
        if (strcmp(entry.file_name, filename.c_str()) == 0) {
            file = &entry;
            break;
        }
    }
    if (!file) {
        std::cerr << "Error: File not found\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    uint8_t rights = 0;
    if (accessrights.length() != 3) {
        std::cerr << "Error: Invalid access rights format\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }
    if (accessrights[0] == 'r') rights |= READ;
    if (accessrights[1] == 'w') rights |= WRITE;
    if (accessrights[2] == 'x') rights |= EXECUTE;

    file->access_rights = rights;

    if (disk.write(current_dir_blk, reinterpret_cast<uint8_t*>(current_dir)) < 0) {
        std::cerr << "Error: Failed to update directory\n";
        if (parentDirPath != pwd_path) cd(originalPath);
        return -1;
    }

    if (parentDirPath != pwd_path) {
        if (cd(originalPath) < 0) {
            std::cerr << "Error: Failed to return to the original directory\n";
            return -1;
        }
    }

    return 0;
}