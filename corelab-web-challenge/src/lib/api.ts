import { CreateTodoPayload, ITodo, UpdateTodoPayload } from "../types/Todo";

const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  const res = await fetch(endpoint(path), { cache: "no-store" });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
};

export const getVehicles = async () => {
  return get("/vehicles");
};

const parseJsonSafely = async (res: Response) => {
  if (res.status === 204) return null as unknown as any;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return null as unknown as any;
};

const post = async <TBody, TRes = any>(
  path: string,
  body?: TBody,
): Promise<TRes> => {
  const res = await fetch(endpoint(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return parseJsonSafely(res);
};

const put = async <TBody, TRes = any>(
  path: string,
  body?: TBody,
): Promise<TRes> => {
  const res = await fetch(endpoint(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  return parseJsonSafely(res);
};

const del = async (path: string): Promise<void> => {
  await fetch(endpoint(path), { method: "DELETE" });
};

export const listTodos = async (): Promise<ITodo[]> => get("/todos");
export const getTodo = async (id: number): Promise<ITodo> =>
  get(`/todos/${id}`);
export const createTodo = async (payload: CreateTodoPayload): Promise<ITodo> =>
  post<CreateTodoPayload, ITodo>("/todos", payload);
export const updateTodo = async (
  id: number,
  payload: UpdateTodoPayload,
): Promise<ITodo> => put<UpdateTodoPayload, ITodo>(`/todos/${id}`, payload);
export const deleteTodo = async (id: number): Promise<void> =>
  del(`/todos/${id}`);
export const favoriteTodo = async (id: number): Promise<ITodo> =>
  post<undefined, ITodo>(`/todos/${id}/favorite`);
export const unfavoriteTodo = async (id: number): Promise<ITodo> =>
  post<undefined, ITodo>(`/todos/${id}/unfavorite`);
export const setTodoColor = async (id: number, color: string): Promise<ITodo> =>
  post<{ color: string }, ITodo>(`/todos/${id}/color`, { color });
