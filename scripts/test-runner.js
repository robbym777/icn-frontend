#!/usr/bin/env node

/**
 * Test Runner Script
 * 
 * This script provides various test running options for the Todo App project.
 * Usage examples:
 * - npm run test              # Run all tests
 * - npm run test:watch        # Run tests in watch mode
 * - npm run test:coverage     # Run tests with coverage report
 * - npm run test:stores       # Run only store tests
 * - npm run test:components   # Run only component tests
 */

const { spawn } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const testType = args[0];

// Base Jest command
const jestCmd = 'npx';
const jestArgs = ['jest'];

// Configure test runs based on type
switch (testType) {
  case 'stores':
    jestArgs.push('--testPathPattern=stores');
    break;
  
  case 'components':
    jestArgs.push('--testPathPattern=components');
    break;
  
  case 'integration':
    jestArgs.push('--testPathPattern=integration');
    break;
  
  case 'lib':
    jestArgs.push('--testPathPattern=lib');
    break;
  
  case 'watch':
    jestArgs.push('--watch');
    break;
  
  case 'coverage':
    jestArgs.push('--coverage');
    break;
  
  case 'ci':
    jestArgs.push('--ci', '--watchAll=false', '--coverage');
    break;
  
  default:
    // Run all tests by default
    break;
}

// Add any additional arguments
jestArgs.push(...args.slice(1));

console.log(`🧪 Running tests: ${jestArgs.join(' ')}`);

// Spawn the Jest process
const jest = spawn(jestCmd, jestArgs, {
  stdio: 'inherit',
  cwd: process.cwd(),
});

jest.on('close', (code) => {
  process.exit(code);
});

jest.on('error', (error) => {
  console.error('Error running tests:', error);
  process.exit(1);
});