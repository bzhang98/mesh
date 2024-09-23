# MESH (Minimal Emulated SHell)
This project implements a simulated terminal environment within a React application. It provides a basic file system, command processing, and a set of common Unix-like commands.

## Features
- In-memory file system with support for files and directories
- Command processor with support for common Unix-like commands
- TypeScript for improved type safety and developer experience
- React component for rendering the terminal interface

### Supported Commands

#### ```help```
The ```help``` command takes no arguments and outputs the available commands to the terminal

#### ```ls```
The ```ls``` command takes no arguments and outputs the contents of the current directory to the terminal

#### ```pwd```
The ```pwd``` command takes no arguments and outputs the current path to the terminal

#### ```cd``` 
The ```cd``` command takes the target directory as an argument and navigates to the specified directory

##### Usage
- ```cd <dirname>``` navigates down one level to the specified directory
- ```cd ..``` navigates up one level to the parent directory
- ```cd <path>``` provide the absolute path for fine-tuned navigation

##### Examples
- ```cd dir1``` navigate down 1 level to the dir1 directory
- ```cd /dir1/dir2/dir3``` navigate from root down to the dir3 directory

#### ```mkdir```
The ```mkdir``` command takes one argument and creates a new directory inside the current directory

##### Usage
```mkdir <directory>``` 

#### ```touch```
The ```touch``` command takes one argument and creates a new file inside the current directory

##### Usage
```touch <file>``` 

#### ```echo```
The ```echo``` command takes one argument and can be used to output the provided text to the terminal or write to a file

##### Usage
- ```echo <text>``` outputs the given text to the terminal
- ```echo <text> > <filename>``` use with the ```>``` operator to write the output to a file, **overwriting** the file contents
- ```echo <text> >> <filename>``` use with the ```>>``` operator to **append** the output to a file as a new line

##### Examples
- ```echo Hello, World! > output.txt``` writes "Hello, World!" to output.txt, replacing its content if the file exists.
- ```echo More text >> output.txt``` appends "More text" to output.txt as a new line, keeping the existing content.

#### ```cat```
The ```cat``` commands takes a file name as an argument and outputs the file contents to the terminal

##### Usage
```cat <filename>```

## Live Preview
Coming Soon ⏳

## Future Improvements
- Add support for command history navigation
- Implement tab completion for commands and file names
- Add more complex commands (grep, find, etc.)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the MIT License.
