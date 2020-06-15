import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITasks {
  name: string;
  done: boolean;
}

const App = (): JSX.Element => {
  const [newTask, setNewTask] = useState<string>("");
  const [listTaks, setListTasks] = useState<ITasks[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTasks(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTasks = (name: string): void => {
    const newTasks: ITasks[] = [...listTaks, { name, done: false }];
    setListTasks(newTasks);
  };

  const handleChange = (i: number): void => {
    const newTasks: ITasks[] = [...listTaks];
    newTasks[i].done = !newTasks[i].done;
    setListTasks(newTasks);
  };

  const handleDelete = (i: number): void => {
    const newTasks: ITasks[] = [...listTaks];
    newTasks.splice(i, 1);
    setListTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control"
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      ref={taskInput}
                      autoFocus
                    />
                    <button className="btn btn-success btn-block mt-2">
                      Send
                    </button>
                  </form>
                </div>
              </div>
              {listTaks.map((t: ITasks, i: number) => (
                <div key={i} className="card card-body mt-2">
                  <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                    {t.name}
                  </h2>
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleChange(i)}
                    >
                      {t.done ? "✓" : "x"}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(i)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
