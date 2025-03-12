import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from Local Storage on first render
  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // Save todos to Local Storage whenever `todos` changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    setTodo(""); // Clear input field
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map(item =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="main px-10">
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
          <h1 className="font-bold text-center text-2xl">Your Todos at one place by Todo Planner</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-lg">Add a Todo</h2>
            <div className="flex">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                className="w-full rounded-full px-5 py-1"
              />
              <button
                disabled={todo.length < 2}
                onClick={handleAdd}
                className="bg-violet-800 disabled:bg-violet-700 mx-2 rounded-full hover:bg-violet-950 p-4 cursor-pointer text-sm font-bold py-1 text-white"
              >
                Save
              </button>
            </div>
          </div>

          <input
            className="my-4 cursor-pointer"
            onChange={toggleFinished}
            id="show"
            type="checkbox"
            checked={showFinished}
          />
          <label className="mx-2" htmlFor="show">Show Finished Todos</label>

          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className="text-center">No Todos</div>}
            {todos.map(item => (
              (showFinished || !item.isComplete) && (
                <div key={item.id} className="todo flex justify-between">
                  <div className="flex gap-2">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isComplete}
                    />
                    <div className={item.isComplete ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md m-1"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold py-1 text-white rounded-md m-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
