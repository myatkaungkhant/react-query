"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const queryClient = useQueryClient();

  const getAllTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
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

  const createNewTodo = async () => {
    try {
      const res = await axios.post("http://localhost:3000/todos", {
        taskName: "Task To Do",
        isFinished: false
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["post", "todos"],
    mutationFn: createNewTodo,
  });

  const onCreateNewTodo = () => {
    mutate(
      {},
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["get", "todos"],
          });
        },
      }
    );
  };

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
      <button onClick={onCreateNewTodo}>Create</button>
    </>
  );
}
