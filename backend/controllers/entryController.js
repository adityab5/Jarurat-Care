import Entry from "../models/Entry.js";

export const createEntry = async (req, res) => {
  try {
    const entry = new Entry({
      ...req.body,
      createdBy: req.user._id,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating entry", error: error.message });
  }
};

export const getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate("createdBy", "name email");
    res.json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching entries", error: error.message });
  }
};

export const getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching entry", error: error.message });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating entry", error: error.message });
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting entry", error: error.message });
  }
};
