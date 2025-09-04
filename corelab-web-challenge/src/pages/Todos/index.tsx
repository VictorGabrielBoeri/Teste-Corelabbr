import { useEffect, useMemo, useState } from "react";
import { Button, Card, Search } from "../../components";
import styles from "./Todos.module.scss";
import { ITodo } from "../../types/Todo";
import {
  listTodos,
  createTodo,
  deleteTodo,
  favoriteTodo,
  unfavoriteTodo,
  setTodoColor,
} from "../../lib/api";

const TodosPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<string>("");
  const [theme, setTheme] = useState<string>(
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fechar sidebar ao clicar fora
  const closeSidebar = () => {
    console.log("Closing sidebar");
    setSidebarOpen(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    console.log("Toggling sidebar from:", sidebarOpen, "to:", !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const refresh = async () => {
    const data = await listTodos();
    setTodos(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let base = q
      ? todos.filter((t) =>
          [t.title, t.description].some((v) =>
            (v ?? "").toLowerCase().includes(q)
          )
        )
      : todos;
    if (onlyFavorites) base = base.filter((t) => t.isFavorite);
    if (colorFilter)
      base = base.filter(
        (t) => (t.color || "").toLowerCase() === colorFilter.toLowerCase()
      );
    const favs = base.filter((t) => t.isFavorite);
    const rest = base.filter((t) => !t.isFavorite);
    return [...favs, ...rest];
  }, [todos, search, onlyFavorites, colorFilter]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTodo({
      title: title.trim(),
      description: description.trim() || undefined,
    });
    setTitle("");
    setDescription("");
    await refresh();
  };

  const handleFavorite = async (todo: ITodo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, isFavorite: true } : t))
    );
    try {
      await favoriteTodo(todo.id);
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, isFavorite: false } : t))
      );
    }
  };

  const handleUnfavorite = async (todo: ITodo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, isFavorite: false } : t))
    );
    try {
      await unfavoriteTodo(todo.id);
    } catch {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, isFavorite: true } : t))
      );
    }
  };

  const handleDelete = async (todo: ITodo) => {
    await deleteTodo(todo.id);
    await refresh();
  };

  const handleColor = async (todo: ITodo, color: string) => {
    await setTodoColor(todo.id, color);
    await refresh();
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={styles.Todos}>
      {/* Botão hamburger para mobile */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleSidebar}
        style={{
          backgroundColor: "var(--primary, #007bff)",
        }}
        title={`Sidebar: ${sidebarOpen ? "Open" : "Closed"}`}>
        <span className="material-symbols-rounded">menu</span>
      </button>

      {/* Overlay para fechar sidebar */}
      <div
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.open : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar responsiva */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.brand}>
          todo<span style={{ color: "var(--primary-2)" }}>.</span>
          {/* Botão fechar para mobile */}
          <button onClick={closeSidebar} className={styles.mobileCloseButton}>
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div>
          <div className={styles.filtersTitle}>
            <span>Filters</span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "var(--panel-2)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                borderRadius: 10,
                padding: "6px 10px",
                cursor: "pointer",
              }}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
          <div className={styles.navList}>
            <div className={styles.navItem}>
              <span className={styles.navIcon}>dashboard</span> All
            </div>
          </div>
          <div style={{ height: 12 }} />
          <div className={styles.filterRow}>
            <Search placeholder="Buscar" value={search} onChange={setSearch} />
          </div>
          <div className={styles.filterRow}>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={onlyFavorites}
                onChange={(e) => setOnlyFavorites(e.target.checked)}
              />
              Somente favoritos
            </label>
          </div>
          <div className={styles.filterRow}>
            <span>Filtrar por cor:</span>
            <input
              type="color"
              className={styles.color}
              value={colorFilter || "#000000"}
              onChange={(e) => setColorFilter(e.target.value)}
            />
            <Button text="Clear" onClick={() => setColorFilter("")} />
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.addSection}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 12,
            }}>
            <input
              type="text"
              placeholder="Nova tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                background: "var(--panel)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 12px",
                width: "80%",
              }}
            />
            <textarea
              placeholder="Description (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: "80%",
                background: "var(--panel)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 12px",
                resize: "vertical",
              }}
            />
            <Button
              className={styles.addTaskButton}
              text="Add Task"
              onClick={handleAdd}
              style={{ width: "15%" }}
            />
          </div>
        </div>
        <div className={styles.list}>
          {filtered.map((todo) => (
            <Card key={todo.id} title={todo.title}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 8,
                  alignItems: "center",
                }}>
                {todo.description && <p>{todo.description}</p>}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    className={styles.color}
                    value={todo.color || "#cccccc"}
                    onChange={(e) => handleColor(todo, e.target.value)}
                  />
                  {todo.isFavorite ? (
                    <button
                      onClick={() => handleUnfavorite(todo)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border)",
                        color: "#FFC107",
                        borderRadius: 10,
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                      title="Remover dos favoritos">
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 24",
                        }}>
                        star
                      </span>
                      &nbsp;
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFavorite(todo)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        borderRadius: 10,
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                      title="Adicionar aos favoritos">
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontVariationSettings:
                            "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                        }}>
                        star
                      </span>
                      &nbsp;
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo)}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border)",
                      color: "var(--muted)",
                      borderRadius: 10,
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}>
                    <span className="material-symbols-rounded">delete</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TodosPage;
