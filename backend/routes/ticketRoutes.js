const express = require("express");
const router = express.Router();

const {
  getTickets,
  createTicket,
  getOneTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Re-route into note routes
const noteRouter = require("./noteRoutes")
router.use("/:ticketId/notes", noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getOneTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
