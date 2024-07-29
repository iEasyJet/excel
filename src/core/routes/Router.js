import { $ } from '../dom.js';
import { ActiveRoute } from './ActiveRoute.js';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.handleHashChange = this.handleHashChange.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.handleHashChange);
    this.handleHashChange();
  }

  handleHashChange() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }
}
