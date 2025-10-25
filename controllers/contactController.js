const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the contact
 *         name:
 *           type: string
 *           description: The contact's name
 *         email:
 *           type: string
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           description: The contact's phone number
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the contact was last updated
 *       example:
 *         _id: 507f1f77bcf86cd799439011
 *         name: John Doe
 *         email: john.doe@example.com
 *         phone: "+1234567890"
 *         createdAt: 2023-10-25T10:30:00.000Z
 *         updatedAt: 2023-10-25T10:30:00.000Z
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *             example:
 *               contacts:
 *                 - _id: 507f1f77bcf86cd799439011
 *                   name: John Doe
 *                   email: john.doe@example.com
 *                   phone: "+1234567890"
 *                   createdAt: 2023-10-25T10:30:00.000Z
 *                   updatedAt: 2023-10-25T10:30:00.000Z
 */
//@desc    Get all contacts
//@route   GET /api/contacts
//@access  Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({ contacts });
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Create a new contact with name, email, and phone
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: The contact's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The contact's email address
 *               phone:
 *                 type: string
 *                 description: The contact's phone number
 *           example:
 *             name: John Doe
 *             email: john.doe@example.com
 *             phone: "+1234567890"
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are mandatory!
 */
//@desc    Create new contact
//@route   POST /api/contacts
//@access  Public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json({ contact });
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a specific contact by its ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID (MongoDB ObjectId)
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Contact found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact not found
 */
//@desc    Get a contact
//@route   GET /api/contacts/:id
//@access  Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ contact });
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID (MongoDB ObjectId)
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The contact's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The contact's email address
 *               phone:
 *                 type: string
 *                 description: The contact's phone number
 *           example:
 *             name: John Smith
 *             email: john.smith@example.com
 *             phone: "+9876543210"
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact not found
 */
//@desc    Update a contact
//@route   PUT /api/contacts/:id
//@access  Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ contact });
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete an existing contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID (MongoDB ObjectId)
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact not found
 */
//@desc    Delete a contact
//@route   DELETE /api/contacts/:id
//@access  Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}