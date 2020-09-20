// Requirements
const path = require('path')
const fs = require('fs')
const solc = require('solc')

// Set up path
const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Compile statement
module.exports = solc.compile(source, 1).contracts[':Inbox'];