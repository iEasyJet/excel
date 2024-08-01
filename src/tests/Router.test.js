import { JSDOM } from 'jsdom';
import { Router } from '../core/routes/Router';
import { Page } from '../core/Page';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'Dashboard Page';
    return root;
  }
}

class ExcelPage extends Page {}

describe('Router', () => {
  let router;
  let root;
  beforeEach(() => {
    root = document.createElement('div');
    router = new Router(root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    });
  });

  test('be defined', () => {
    expect(router).toBeDefined();
  });

  test('render dashboard page', () => {
    router.handleHashChange();
    expect(root.innerHTML).toBe('<div>Dashboard Page</div>');
  });
});
