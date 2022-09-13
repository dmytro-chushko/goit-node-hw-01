const { program } = require('commander');
const {
  ActionlistContacts,
  getContactsById,
  removeContact,
  addContact,
} = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contactById = await getContactsById(id);
      console.log(contactById);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-ph, --phone <type>');

program.parse(process.argv);
const options = program.opts();

invokeAction(options);
