// packages needed for this application - file structure and inquirer
const fs = require('fs');
const inquirer = require('inquirer');

const generateReadMe = (answers) => {
  // handling the licensing - adds a badge for the license next to the title and the appropriate license text to the license section
  if (answers.license === "No License") {
    license = `## License
This project is not covered by a license. Read more about what this means at [https://choosealicense.com/no-permission/].`;
    title = `# ${answers.title}`
  } else if (answers.license === "Apache License v2.0") {
    license = `## License
Copyright 2021 ${answers.username}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`
    title = `# ${answers.title} [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`

} else if (answers.license === "GNU General Public License v3.0") {
license = `## License
Copyright (C) 2021  ${answers.username}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
    title = `# ${answers.title} [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`

  } else if (answers.license === "MIT License") {
    license = `## License
The MIT License (MIT)

Copyright (c) 2021 ${answers.username}

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    title = `# ${answers.title} [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
  };

  return `${title}

## Description
${answers.description}

## Table of Contents
[Installation](https://github.com/${answers.username}/${answers.repo}#installation)
[Usage](https://github.com/${answers.username}/${answers.repo}#usage)
[Contributing](https://github.com/${answers.username}/${answers.repo}#contributing)
[License](https://github.com/${answers.username}/${answers.repo}#license)
[Tests](https://github.com/${answers.username}/${answers.repo}#tests)
[Questions](https://github.com/${answers.username}/${answers.repo}#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.credit}

${license}

## Tests
${answers.tests}

## Questions
Reach out to me at ${answers.email} if you have questions about this project. 
You can explore more of my projects at https://github.com/${answers.username}.
`;

}

// prompts for necessary info to create the content of the readme file
inquirer
  .prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'repo',
        message: 'What is the name of the GitHub repository for this project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Write a description for your project',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Describe how the user can install your project',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Give a brief description of the usage of your project',
    },
    {
        type: 'input',
        name: 'credit',
        message: 'List any collaborators on this project, including their GitHub usernames',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select a license',
        choices: ['Apache License v2.0', 'GNU General Public License v3.0', 'MIT License', 'No License'],
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe how the user can execute tests on this project',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Provide your email so others can contact you for questions',
    },
    {
        type: 'input',
        name: 'username',
        message: 'Provide your GitHub username',
    },
  ])
  .then((answers) => {
    const readMeContent = generateReadMe(answers);
    fs.writeFile('README.md', readMeContent, (err) => err ? console.log(err) : console.log('README complete.'));
  });
  // .catch((error) => {
  //   if (error.isTtyError) {
  //     // Prompt couldn't be rendered in the current environment
  //   } else {
  //     // Something else went wrong
  //   }
  // });


