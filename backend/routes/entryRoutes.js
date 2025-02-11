import express from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import { validateEntry } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorizeAdmin,
  validateEntry,
  createEntry
);
router.get("/all", authenticate, getAllEntries);
router.get("/byId/:id", authenticate, getEntryById);
router.put(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  validateEntry,
  updateEntry
);
router.delete("/delete/:id", authenticate, authorizeAdmin, deleteEntry);

export default router;
