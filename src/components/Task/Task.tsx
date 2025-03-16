import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Todo = {
  id: number;
  title: string;
};

interface TaskProps {
  todo: Todo;
}

const Task: React.FC<TaskProps> = ({ todo }) => {
  const id = todo.id;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={todo.id}
      className="p-4 border rounded-lg flex gap-5 bg-white shadow-sm"
    >
      <input type="checkbox" className="checkbox" />
      <h3 className="text-lg font-semibold">{todo.title}</h3>
      {/* <p
        className={`text-sm mt-1 ${
          todo.status === "Completed"
            ? "text-green-600"
            : todo.status === "In Progress"
            ? "text-blue-600"
            : "text-red-600"
        }`}
      >
        {todo.status}
      </p> */}
    </div>
  );
};

export default Task;
