import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState, useEffect } from "react";
// import Input from "../Input/Input";
import { Input } from "../../components/ui/input"
import { Button } from "../ui/button";

type Todo = {
  id: number;
  title: string;
};

const Home = () => {
  // Load tasks from localStorage, if available
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      { id: 1, title: "Add tests to homepage" },
      { id: 2, title: "Fix styling in about section" },
      { id: 3, title: "Learn how to center a div" },
      { id: 4, title: "Refactor the main layout for responsiveness" },
      // { id: 5, title: "Optimize images on product page" },
      // { id: 6, title: "Fix broken links in the footer" },
      // { id: 7, title: "Update the contact form validation" },
      // { id: 8, title: "Implement dark mode toggle" },
    ];
  };

  const [tasks, setTasks] = useState<Todo[]>(loadTasks);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTaskPos = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id as number);
      const newPos = getTaskPos(over.id as number);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  // const addTask = (title: string) => {
  //   setTasks((tasks) => {
  //     const newTask = { id: tasks.length + 1, title };
  //     return [...tasks, newTask];
  //   });
  // };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="flex">
        <div className="w-1/2">
          <form className="w-1/2 m-10 space-y-4 shadow-sm border p-10 rounded-md" action="">
          <Input type="text" placeholder="Task" />
          <Input type="text" placeholder="Description" />
        <Button>Add</Button>
          </form>
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            {/* <Input onSubmit={addTask} /> */}
            <h2 className="text-3xl mt-10 font-semibold mb-6 text-center text-gray-800">
              My To-Do List
            </h2>
            <div className="space-y-4">
              <SortableContext
                items={tasks.map((todo) => todo.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((todo) => (
                  <Task key={todo.id} todo={todo} />
                ))}
              </SortableContext>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default Home;
