const argv = require('yargs').argv;
const { hideBin } = require('yargs/helpers');
const {
  contactsPath,
  listContacts,
  getContactsById,
  removeContact,
  addContact,
} = require('./contacts');

console.log(argv);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      // ... id
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction(argv);
