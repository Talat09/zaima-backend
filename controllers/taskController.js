const { Task, TaskActivity } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.user.id);
  console.log(title, description);
  try {
    const task = await Task.create({ title, description, UserId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { title, description, status } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).send("Task not found");

    await task.update({ title, description, status });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).send("Task not found");

    await task.destroy();
    res.send("Task deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
