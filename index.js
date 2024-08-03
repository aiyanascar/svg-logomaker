const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

async function generateLogo() {
  try {
    console.log("Starting the logo generation process...");

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter text for the logo (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be up to 3 characters.',
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hexadecimal):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['Circle', 'Triangle', 'Square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hexadecimal):',
      },
    ]);

    console.log("User inputs received:", answers);

    let shape;
    switch (answers.shape) {
      case 'Circle':
        shape = new Circle(answers.shapeColor);
        break;
      case 'Triangle':
        shape = new Triangle(answers.shapeColor);
        break;
      case 'Square':
        shape = new Square(answers.shapeColor);
        break;
    }

    const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>`;

    fs.writeFileSync('logo.svg', svgContent.trim());
    console.log('Generated logo.svg');
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

generateLogo();
