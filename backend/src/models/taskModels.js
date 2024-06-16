const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
}

const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
  
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
  
    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
    return {insertId: createdTask.insertId};
  };

  const deleteTask = async (id) => {
    const removeTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removeTask;
}

const uptadeTask = async (id, task) => {
    const uptadedTask = await connection.execute('UPDATE tasks SET title = ?, status = ? WHERE id = ?', [task.title, task.status, id]);
    return uptadedTask;
}


module.exports = {
    getAll,
    createTask,
    deleteTask,
    uptadeTask
};