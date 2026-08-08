const express = require("express");

const router = express.Router();


const {
  register,
  login
} = require("../controllers/authController");


const validate = require("../middleware/validate");

const {
  registerValidation
} = require("../validators/authValidator");



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */

router.post(
  "/register",
  registerValidation,
  validate,
  register
);





/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Wrong credentials
 */

router.post(
  "/login",
  login
);



module.exports = router;