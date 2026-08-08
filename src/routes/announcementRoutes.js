const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");


const {
    getAnnouncements,
    getAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} = require("../controllers/announcementController");


const validate = require("../middleware/validate");

const {
    announcementValidation
} = require("../validators/announcementValidator");




/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Metro announcements management
 */





/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: List of announcements
 */

router.get(
    "/",
    getAnnouncements
);







/**
 * @swagger
 * /api/announcements/{id}:
 *   get:
 *     summary: Get announcement by id
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement found
 *       404:
 *         description: Announcement not found
 */

router.get(
    "/:id",
    getAnnouncement
);







/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Create announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *               - station
 *             properties:
 *               title:
 *                 type: string
 *                 example: Metro Delay
 *               message:
 *                 type: string
 *                 example: Train delayed 10 minutes
 *               station:
 *                 type: string
 *                 example: 64a7732a4bdc38c86ace3762
 *     responses:
 *       201:
 *         description: Announcement created
 */

router.post(
    "/",
    auth,
    announcementValidation,
    validate,
    createAnnouncement
);








/**
 * @swagger
 * /api/announcements/{id}:
 *   put:
 *     summary: Update announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Delay
 *               message:
 *                 type: string
 *                 example: Train delayed 20 minutes
 *     responses:
 *       200:
 *         description: Announcement updated
 */

router.put(
    "/:id",
    auth,
    updateAnnouncement
);







/**
 * @swagger
 * /api/announcements/{id}:
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Announcement deleted
 */

router.delete(
    "/:id",
    auth,
    deleteAnnouncement
);



module.exports = router;