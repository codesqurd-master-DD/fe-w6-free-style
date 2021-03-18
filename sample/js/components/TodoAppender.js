import Component from "../core/Component.js";

export default class TodoAppender extends Component {
  selectPropsToUse() {
    const { addTodo } = this.props;
    this.selfProps = { addTodo };
  }
  getTemplate() {
    return `<input class="new-todo" placeholder="할일을 추가해주세요" autofocus></input>`;
  }
  setEventLinstener() {
    const { addTodo } = this.selfProps;

    this.addEventLinstener("keyup", "#new-todo-title", ({ key, target }) => {
      if (key !== "Enter") return;
      addTodo(target.value);
      target.value = "";
    });
  }
}
