export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group = [];
    this.current = $el;
    this.group.push($el);
    $el.addClass(TableSelection.className);
  }

  clear() {
    this.group.forEach((el) => {
      el.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  selectGroup() {}
}
