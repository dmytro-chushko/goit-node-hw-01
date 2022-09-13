const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function listContacts () {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactsById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(item => Number(item.id) === contactId);
  if(!contactById) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  console.log(contactById);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => Number(item.id) === contactId);
  if(idx === -1) {
    console.log(`There is no item with id: ${contactId}`);
    return null;
  }
  const updatedContacts = contacts.filter(item => Number(item.id) !== contactId);
  console.log(updatedContacts);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const updatedContacts = [...contacts, {id: v4(), name, email, phone}]
  console.log(updatedContacts);
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
  contactsPath
}