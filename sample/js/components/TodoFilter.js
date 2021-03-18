import Component from "../core/Component.js";

export default class TodoFilter extends Component {
  selectPropsToUse() {
    const { typeOfFilter, filteredList, filterList } = this.props;
    this.selfProps = { typeOfFilter, filteredList, filterList };
  }
  getTemplate() {
    const { typeOfFilter, filteredList } = this.selfProps;
    return `
        <span class="todo-count">총 <strong>${
          filteredList.length
        }</strong> 개</span>
        <ul class="filters">
          <li>
            <button class="filterBtn" data-type-of-filter="all" ${
              typeOfFilter === "all" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>전체보기</button>
          </li>
          <li>
            <button class="filterBtn" data-type-of-filter="doing" ${
              typeOfFilter === "doing" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>해야할 일</button>
          </li>
          <li>
            <button class="filterBtn" data-type-of-filter="completed" ${
              typeOfFilter === "completed" &&
              'style ="border: 2px solid rgba(100, 47, 47, 0.2);"'
            }>완료한 일</button>
          </li>
        </ul>
        `;
  }
  setEventLinstener() {
    const { filterList } = this.selfProps;
    this.addEventLinstener("click", ".filterBtn", ({ target }) => {
      const typeOfFilter = target.dataset.typeOfFilter;
      filterList(typeOfFilter);
    });
  }
}
