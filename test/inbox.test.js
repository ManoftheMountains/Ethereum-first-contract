const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
//const web3 = new Web3(ganache.provider());

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
                //.then(fetchedAccounts => {
            //console.log(fetchedAccounts);
    // Use one of those accounts to deploy the contract

    // Teaches web3 about what methods an inbox contract has
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    // Tells web3 that we want to deploy a new copy of this contract
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    // Instructs web3 to send out a transaction that creates this contract
    .send({ from: accounts[0], gas: '1000000' });
});

// ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
// inbox.setProvider(provider);

describe('Inbox', () => {
    it('deploys a contract', () => {
      assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
      const message = await inbox.methods.message().call();
      assert.strictEqual(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'bye');
    });
  });