const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getNotes,
  createNote,
//   updateNote,
//   deleteNote,
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes)
    .post(protect, createNote);

// router.route("/:id").delete(protect, deleteNote).put(protect, updateNote);

module.exports = router;
