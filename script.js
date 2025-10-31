document.addEventListener('DOMContentLoaded', function() {
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');
    const promptSpan = document.getElementById('prompt');

    let commandHistory = [];
    let historyIndex = -1;

    const contentAbout = document.getElementById('content-about');
    const contentProjects = document.getElementById('content-projects');

    function printOutput(message, isHtml = false) {
        const line = document.createElement('div');
        if (isHtml) {
            line.innerHTML = message;
        } else {
            line.textContent = message;
        }
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '';
    }

    function displayHelp() {
        printOutput('Available commands:');
        printOutput('  about    - Display information about Slade Rose.');
        printOutput('  projects - List GitHub projects.');
        printOutput('  contact  - Display contact information.');
        printOutput('  clear    - Clear the terminal screen.');
        printOutput('  help     - Show this help message.');
    }

    function displayContact() {
        printOutput('You can connect with me on LinkedIn or reach out via email.');
        printOutput('LinkedIn: https://www.linkedin.com/in/sladerose');
        printOutput('Email: your.email@example.com'); // Placeholder
    }

    async function displayProjects() {
        printOutput('Fetching projects from GitHub...');
        try {
            const response = await fetch('https://api.github.com/users/sladerose/repos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.length === 0) {
                printOutput('No public projects found on GitHub.');
                return;
            }

            printOutput('My GitHub Projects:');
            data.forEach(project => {
                printOutput(`  - ${project.name}`);
                printOutput(`    Description: ${project.description || 'No description provided.'}`);
                printOutput(`    URL: ${project.html_url}`);
                printOutput(''); // Empty line for spacing
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            printOutput('Failed to load projects. Please try again later.');
        }
    }

    function handleCommand(command) {
        const lowerCommand = command.toLowerCase().trim();
        printOutput(promptSpan.textContent + ' ' + command);

        switch (lowerCommand) {
            case 'about':
                printOutput(contentAbout.innerHTML, true);
                break;
            case 'projects':
                displayProjects();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'help':
                displayHelp();
                break;
            case 'contact':
                displayContact();
                break;
            case '':
                break;
            default:
                printOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }
    }

    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            commandHistory.unshift(command); // Add to history
            historyIndex = -1; // Reset history index
            handleCommand(command);
            commandInput.value = ''; // Clear input
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    // Initial welcome message
    printOutput('Welcome to Slade Rose\'s personal terminal!');
    printOutput('Type \'help\' to see available commands.');
    printOutput('');
});
