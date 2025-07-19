const express = require("express");
const router = express.Router();
const { validateEditorData } = require("../middleware/validation");
const { optionalAuth } = require("../middleware/auth");
const {
  getConfiguration,
  saveConfiguration,
  getConfigurations,
  deleteConfiguration,
} = require("../controllers/editorController");

// Get all saved configurations
router.get("/configurations", optionalAuth, getConfigurations);

// Get specific configuration
router.get("/configuration/:id?", optionalAuth, getConfiguration);

// Save configuration
router.post("/configuration", optionalAuth, validateEditorData, saveConfiguration);

// Update configuration
router.put("/configuration/:id", optionalAuth, validateEditorData, saveConfiguration);

// Delete configuration
router.delete("/configuration/:id", optionalAuth, deleteConfiguration);

module.exports = router;
