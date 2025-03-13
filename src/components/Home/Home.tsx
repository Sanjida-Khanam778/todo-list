import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "../ui/button";
import Task from "../Task/Task";
import { closestCorners, DndContext } from "@dnd-kit/core";

type Todo = {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
};

const Home = () => {
  const todos: Todo[] = [
    { id: 1, title: "Complete React Assignment", status: "Pending" },
    { id: 2, title: "Review PRs on GitHub", status: "In Progress" },
    { id: 3, title: "Write Blog on Tailwind CSS", status: "Completed" },
  ];
  

  return (
    <DndContext collisionDetection={closestCorners}>

    <div>
      <h1 className="text-4xl">Todo List</h1>

      <Button className="text-2xl px-4 py-2 m-4">Add</Button>

      <div className="max-w-lg mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4 text-center">My To-Do List</h2>
        <div className="space-y-4">
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {todos.map((todo) => (
              <Task key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
    </DndContext>
  );
};

export default Home;
