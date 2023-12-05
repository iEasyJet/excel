import { ExcelComponent } from '../../core/ExcelComponent.js';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
          <div class="input" contenteditable="true" spellcheck="false"></div>
        `;
  }

  onInput() {
    console.log('onInput Formula', event.target.textContent.trim());
  }

  onClick() { }
}
