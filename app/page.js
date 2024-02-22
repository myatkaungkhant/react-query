"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const getAllTodos = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
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
              {todo.id}-{todo.title}
            </li>
          );
        })}
    </>
  );
}
