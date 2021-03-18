import Component from "../core/Component.js";
export default class TodoList extends Component {
  selectPropsToUse() {
    const {
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      filteredList,
    } = this.props;

    this.selfProps = {
      toggleTodo,
      deleteTodo,
      onEditingMode,
      editTodo,
      filteredList,
    };
  }
  getTemplate() {
    const { filteredList } = this.selfProps;
    return `
    <ul  class="todo-list">

    ${filteredList
      .map(
        (todo) => `
        <li class="${todo.state} ${todo.edit}" data-seq="${todo.seq}">
            <div class="view" >
                <input class="toggle" type="checkbox" ${
                  todo.state === "completed" ? "checked" : ""
                } />
                <label class="label">${todo.contents}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
        </li>
    `
      )
      .join("")}
      </ul>
        `;
  }

  setEventLinstener() {
    const { toggleTodo, deleteTodo, onEditingMode, editTodo } = this.selfProps;

    this.addEventLinstener("click", ".toggle", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      toggleTodo(seq);
    });
    this.addEventLinstener("click", ".destroy", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      deleteTodo(seq);
    });
    this.addEventLinstener("dblclick", ".label", ({ target }) => {
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      onEditingMode(seq);
    });
    this.addEventLinstener("keyup", ".edit", ({ key, target }) => {
      if (key === "Enter") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        editTodo(seq, target.value);
      } else if (key === "Escape") {
        const seq = Number(target.closest("[data-seq]").dataset.seq);
        onEditingMode(seq);
      } else {
        return;
      }
    });
  }
}
