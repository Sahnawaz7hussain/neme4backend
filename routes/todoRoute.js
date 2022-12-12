const express = require("express");
const { TodoModel } = require("../models/todoModel");

const todoRoute = express.Router();

todoRoute.get("/", async (req, res) => {
  const userId = req.body.userId;
  let { status, tag } = req.query;
  let query = {};
  userId && (query.userId = userId);
  status && (query.status = status);
  tag && (query.tag = tag);

  console.log("userd Id:   qqery", query);
  const todos = await TodoModel.find(query);
  // console.log("todos res.", todos);
  res.send(todos);
});
// get by id
todoRoute.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const todo = await TodoModel.findById({ _id: id });

    res.send(todo);
  } catch (err) {
    console.log("get by id err", err.message);
    res.send("something went wrong.");
  }
});

todoRoute.post("/create", async (req, res) => {
  try {
    let data = req.body;
    let newT = new TodoModel(data);
    await newT.save();

    res.send({ msg: "new Todo created", todo: newT });
  } catch (err) {
    console.log("todo create err: ", err.message);
    res.send("some thing went wrong...");
  }
});
todoRoute.patch("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  try {
    let resp = await TodoModel.findByIdAndUpdate({ _id: id }, data);
    res.send({ msg: "updated successfully", todo: resp });
  } catch (err) {
    console.log("update todo err", err.message);
    res.send("something went wrong....");
  }
});
todoRoute.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let resps = await TodoModel.findByIdAndDelete({ _id: id });
    if (resps) {
      res.status(201).send("Todo deleted successfylly");
    } else {
      res.status(401).send("Todo not found with this id");
    }
  } catch (err) {
    console.log("delete todo err", err.message);
    res.send("somethig went wrong...");
  }
});

module.exports = { todoRoute };
