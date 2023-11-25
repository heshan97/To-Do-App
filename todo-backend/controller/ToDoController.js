const ToDoModel = require("../models/ToDoModel");

module.exports.getToDos = async (req, res) => {
  try {
    const toDos = await ToDoModel.find();
    res.send(toDos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Internal Server Error", msg: "Something went wrong!" });
  }
};

module.exports.saveToDo = async (req, res) => {
  try {
    const { toDo, description } = req.body;
    const newToDo = await ToDoModel.create({ toDo, description });
    res.status(201).send(newToDo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Internal Server Error", msg: "Something went wrong!" });
  }
};

module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo, description, completed } = req.body;

  ToDoModel.findByIdAndUpdate(
    id,
    { toDo, description, completed }
    // { new: true } // Returns the updated document
  )
    .then((updatedToDo) => {
      res.status(200).json(updatedToDo);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
module.exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    await ToDoModel.findByIdAndDelete(id);
    res.send("Deleted Successfully....");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Internal Server Error", msg: "Something went wrong!" });
  }
};
module.exports.toggleComplete = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await ToDoModel.findById(id);

    if (!todo) {
      return res.status(404).send("Task not found");
    }

    // Swap current and previous completed states
    const temp = todo.completed;
    todo.completed = todo.previousCompleted;
    todo.previousCompleted = temp;

    await todo.save();

    res.status(200).json({
      message: "Task completion status updated successfully",
      completed: todo.completed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
