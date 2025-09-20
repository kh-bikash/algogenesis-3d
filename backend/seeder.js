// In: backend/seeder.js
    
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { problems } = require('./problems'); // We will delete this file after seeding
const Problem = require('./models/ProblemModel');
const connectDB = require('./db');

dotenv.config();

const importData = async () => {
  try {
    // Connect to the database and WAIT for the connection to be established
    await connectDB();

    // Clear existing problems to prevent duplicates
    await Problem.deleteMany();
    console.log('Existing data cleared...');

    // The problems are grouped by data type, so we need to flatten the list
    // and add the 'dataType' field to each problem object before inserting.
    const problemsToInsert = [];
    Object.keys(problems).forEach(dataType => {
        problems[dataType].forEach(problem => {
            problemsToInsert.push({ ...problem, dataType });
        });
    });

    await Problem.insertMany(problemsToInsert);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Connect to the database and WAIT for the connection to be established
    await connectDB();

    await Problem.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

// Check for command line arguments to determine which function to run
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}