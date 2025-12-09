const Contact = require('../models/Contact');
const { sequelize } = require('../config/db');

// In-memory storage for fallback
let contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message: "I'm interested in your web development services.",
    read: false,
    createdAt: new Date("2023-05-15T10:30:00Z")
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Can you help me with my mobile app project?",
    read: true,
    createdAt: new Date("2023-05-16T14:45:00Z")
  }
];
let nextContactId = 3;

// Check if MySQL is connected
const isMySQLConnected = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

// Get all contact messages
const getContacts = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
      res.json(contacts);
    } else {
      // Fallback to in-memory data
      res.json(contacts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      res.json(contact);
    } else {
      // Fallback to in-memory data
      const contact = contacts.find(c => c.id == req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      res.json(contact);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new contact message (public endpoint)
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const contact = await Contact.create({
        name,
        email,
        message
      });
      
      // In a real application, you might want to send an email notification here
      
      res.status(201).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        contact
      });
    } else {
      // Fallback to in-memory data
      const contact = {
        id: nextContactId++,
        name,
        email,
        message,
        read: false,
        createdAt: new Date()
      };
      contacts.push(contact);
      
      res.status(201).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        contact
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your message. Please try again.'
    });
  }
};

// Update a contact message (mark as read, etc.)
const updateContact = async (req, res) => {
  try {
    const { read } = req.body;
    
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const [updatedRowsCount, updatedContacts] = await Contact.update(
        { read },
        { where: { id: req.params.id }, returning: true }
      );
      
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      res.json(updatedContacts[0]);
    } else {
      // Fallback to in-memory data
      const contactIndex = contacts.findIndex(c => c.id == req.params.id);
      if (contactIndex === -1) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      contacts[contactIndex] = {
        ...contacts[contactIndex],
        read
      };
      
      res.json(contacts[contactIndex]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a contact message
const deleteContact = async (req, res) => {
  try {
    const isConnected = await isMySQLConnected();
    if (isConnected) {
      const contact = await Contact.findByPk(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      await contact.destroy();
      res.json({ message: 'Contact message removed' });
    } else {
      // Fallback to in-memory data
      const contactIndex = contacts.findIndex(c => c.id == req.params.id);
      if (contactIndex === -1) {
        return res.status(404).json({ message: 'Contact message not found' });
      }
      
      const deletedContact = contacts.splice(contactIndex, 1);
      res.json({ message: 'Contact message removed', contact: deletedContact[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};