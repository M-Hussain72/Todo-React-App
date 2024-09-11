import express, { response } from 'express';
import { Todo } from '../model/TodoModal.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (!request.body.note) {
      return response
        .status(400)
        .send({ message: 'Send all required fields: note ' });
    }
    const newTodo = {
      note: request.body.note,
      isComplete: false,
    };
    const todo = await Todo.create(newTodo);

    return response.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/', async (request, response) => {
  try {
    if (!request.body.find) {
      return response
        .status(400)
        .send({ message: 'Send  required fields: { find } ' });
    }
    let filter = {};
    if (request.body.find === 'complete') {
      filter = { isComplete: true };
    } else if (request.body.find === 'incomplete') {
      filter = { isComplete: false };
    }
    const todo = await Todo.find(filter);

    return response.status(200).json({
      count: todo.length,
      data: todo,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:search', async (request, response) => {
  try {
    const { search } = request.params;
    const query = { note: new RegExp(search, 'i') };
    const todo = await Todo.find(query);
    if (todo.length !== 0) {
      return response.status(200).json({
        count: todo.length,
        data: todo,
      });
    }

    return response.status(404).json({ message: 'Todo Not Find!' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/', async (request, response) => {
  try {
    const todo = await Todo.find({});
    if (todo.length !== 0) {
      return response.status(200).json({
        count: todo.length,
        data: todo,
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    if (!request.body.note) {
      return response
        .status(400)
        .send({ message: 'Send all required fields: note ' });
    }

    const { id } = request.params;
    const result = await Todo.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Todo Not Find!' });
    }
    return response.status(200).send({ message: 'Todo Updated successfully ' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put('/complete/:id', async (request, response) => {
  try {
    if (!request.body) {
      return response
        .status(400)
        .send({ message: 'Send required field "isCompete" ' });
    }

    const { id } = request.params;
    const result = await Todo.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Todo Not Find!' });
    }
    return response.status(200).json({ message: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: 'Todo Not Find!' });
    }
    return response.status(200).send({ message: 'Todo Delete successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
