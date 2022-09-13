const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');
const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactsById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(item => item.id === contactId);
  if (!contactById) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  const updatedContacts = contacts.filter(item => item.id !== contactId);
  updateContacts(updatedContacts);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {id: v4(), name, email, phone};
  const updatedContacts = [...contacts, newContact];
  updateContacts(updatedContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
