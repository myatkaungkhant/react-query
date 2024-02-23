"use client";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";

export default function Home() {
  const getAllTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
  };

  const createNewTodo = async () => {
    const res = await axios.post("http://localhost:3000/todos", {
      taskName: "task",
      isFinished: false,
    });
    return res.data;
  };

  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["get", "todos"],
    queryFn: getAllTodos,
  });

  return (
    <>
      {isLoading && "Loading ... ... "}
      {isSuccess &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.id}-{todo.taskName}
            </li>
          );
        })}
      <button onClick={createNewTodo}>Create</button>
    </>
  );
}
