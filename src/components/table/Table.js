import { ExcelComponent } from '../../core/ExcelComponent.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import {
  shouldResize,
  isCell,
  matrix,
  nextSelector,
} from './table.functions.js';
import { TableSelection } from './TableSelection.js';
import { $ } from '../../core/dom.js';
import * as actions from '../../redux/action.js';
import { defaultStyles } from '../../constants.js';
import { parse } from '../../core/parse.js';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(25, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyle(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  init() {
    super.init();

    this.$cell = this.$root.find('[data-id="0:0"]');
    this.selectCell(this.$cell);

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolBar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  async resizeTable(type, event) {
    try {
      const data = await resizeHandler(type, this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.error('Error while resizing table:', error);
    }
  }

  onMousedown(event) {
    const type = shouldResize(event);
    if (type) {
      this.resizeTable(type, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);

      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
        actions.changeText({
          id: this.selection.current.id(),
          value: value,
        })
    );
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
