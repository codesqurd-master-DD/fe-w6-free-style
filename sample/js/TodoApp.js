import Deact from "./core/Deact.js";
import { _ } from "./utils/dom.js";
import TodoAppender from "./components/TodoAppender.js";
import TodoList from "./components/TodoList.js";
import TodoFilter from "./components/TodoFilter.js";
export default class App extends Deact {
  setState() {
    this.state = localStorage.getItem("state")
      ? JSON.parse(localStorage.getItem("state"))
      : {
          typeOfFilter: "all",
          todos: [
            {
              seq: 1,
              contents: "todo 1",
              state: "doing",
              edit: "",
            },
            {
              seq: 2,
              contents: "todo 2",
              state: "doing",
              edit: "",
            },
            {
              seq: 3,
              contents: "todo 3",
              state: "completed",
              edit: "",
            },
          ],
        };
  }

  getTemplate() {
    return `
      <h1>TODOS</h1>
      <div id="new-todo-title"></div>
      <main>
        <input class="toggle-all" type="checkbox"/>
        <div id="todo-list"></div>
        <div id="todo-filter" class="count-container"></div>
      </main>
    `;
  }
  mountComponents() {
    const {
      getFilteredList,
      addTodo,
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      filterList,
    } = this;
    this.createComponent(TodoAppender, "#new-todo-title", () => {
      return {
        addTodo: addTodo.bind(this),
      };
    });
    this.createComponent(TodoList, "#todo-list", () => {
      const filteredList = getFilteredList.call(this);
      return {
        filteredList,
        toggleTodo: toggleTodo.bind(this),
        deleteTodo: deleteTodo.bind(this),
        onEditingMode: onEditingMode.bind(this),
        editTodo: editTodo.bind(this),
      };
    });
    this.createComponent(TodoFilter, "#todo-filter", () => {
      const filteredList = getFilteredList.call(this);
      return {
        typeOfFilter: this.state.typeOfFilter,
        filteredList,
        filterList: filterList.bind(this),
      };
    });
  }

  getFilteredList() {
    const { typeOfFilter, todos } = this.state;
    return todos
      .filter(({ state }) => {
        return typeOfFilter === "all" || typeOfFilter === state;
      })
      .map((el) => {
        return this.deepCopy(el);
      });
  }

  addTodo(contents) {
    const { todos } = this.state;
    const seq = Math.max(0, ...todos.map((todo) => todo.seq)) + 1;
    const state = "doing";
    this.updateState({
      todos: [...todos, { seq, state, contents }],
    });
  }

  toggleTodo(seq) {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    if (todos[index].state === "doing") {
      todos[index].state = "completed";
    } else if (todos[index].state === "completed") {
      todos[index].state = "doing";
    }
    this.updateState({ todos });
  }

  deleteTodo(seq) {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    todos.splice(index, 1);
    this.updateState({ todos });
  }

  onEditingMode(seq) {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    if (todos[index].edit === "editing") {
      todos[index].edit = "";
    } else if (todos[index].edit === "") {
      todos[index].edit = "editing";
    }
    this.updateState({ todos });
  }

  editTodo(seq, editingContents) {
    const { todos } = this.state;
    const index = todos.findIndex((todo) => {
      return todo.seq === seq;
    });
    todos[index].contents = editingContents;
    this.onEditingMode(seq);
    this.updateState({ todos });
  }

  filterList(typeOfFilter) {
    this.updateState({ typeOfFilter });
  }
}
