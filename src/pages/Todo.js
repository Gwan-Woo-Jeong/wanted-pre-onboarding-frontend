import React, { useState, useEffect } from "react";
import axios from "axios";

const TODO_API_URL = "https://www.pre-onboarding-selection-task.shop/todos";

const AXIOS_CONFIG = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIdx, setEditingIdx] = useState(-1);
  const [editingText, setEditingText] = useState("");

  const getTodos = async () => {
    const response = await axios.get(TODO_API_URL, AXIOS_CONFIG);
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.length === 0) return;
    await axios.post(TODO_API_URL, { todo: newTodo }, AXIOS_CONFIG);

    await getTodos();
    setNewTodo("");
  };

  const handleToggleIsComplete = async (id, todo, isCompleted) => {
    await axios.put(
      TODO_API_URL + "/" + id,
      { isCompleted: !isCompleted, todo },
      AXIOS_CONFIG
    );

    await getTodos();
  };

  const handleCancelEdit = () => {
    setEditingIdx(-1);
    setEditingText("");
  };

  const toggleEditTodo = (todo, idx) => {
    setEditingText(todo);
    setEditingIdx(idx);
  };

  const handleEditTodo = async (id, todo, isCompleted) => {
    if (editingText.length === 0 || todo === editingText)
      return handleCancelEdit();

    await axios.put(
      TODO_API_URL + "/" + id,
      { todo: editingText, isCompleted },
      AXIOS_CONFIG
    );

    await getTodos();
    handleCancelEdit();
  };

  const handleDeleteTodo = async (id) => {
    await axios.delete(TODO_API_URL + "/" + id, AXIOS_CONFIG);
    await getTodos();
  };

  return (
    <div id="todo">
      <div className="todo-container">
        <div className="input-wrap">
          <input
            data-testid="new-todo-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="해야할 일을 작성해보세요"
          />
          <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
            <svg
              data-darkreader-inline-stroke=""
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              ></path>
            </svg>
          </button>
        </div>
        <ul>
          {todos.map(({ id, todo, isCompleted }, idx) => (
            <li key={id}>
              {editingIdx === idx ? (
                <>
                  <textarea
                    data-testid="modify-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <button
                    data-testid="submit-button"
                    onClick={() => handleEditTodo(id, todo, isCompleted)}
                  >
                    수정
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() =>
                        handleToggleIsComplete(id, todo, isCompleted)
                      }
                    />
                    <span>{todo}</span>
                  </label>
                  <button
                    data-testid="modify-button"
                    onClick={() => toggleEditTodo(todo, idx)}
                  >
                    <svg
                      data-darkreader-inline-stroke=""
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      ></path>
                    </svg>
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => handleDeleteTodo(id)}
                  >
                    <svg
                      data-darkreader-inline-stroke=""
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      ></path>
                    </svg>
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
