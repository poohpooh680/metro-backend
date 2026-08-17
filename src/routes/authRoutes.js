const express = require("express");

const router = express.Router();


const {
  register,
  login
} = require("../controllers/authController");


const validate = require("../middleware/validate");

const rateLimiter = require("../middleware/rateLimiter");


const {
  registerValidation,
  loginValidation
} = require("../validators/authValidator");



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Admin authentication
 */



/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new admin
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
 *                 example: Admin
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Admin created
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
 * /api/v1/auth/login:
 *   post:
 *     summary: Login admin
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
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many login attempts
 */

router.post(
  "/login",
  rateLimiter,
  loginValidation,
  validate,
  login
);



module.exports = router;