import { createStore } from '../core/createStore';

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + 1};
    default:
      return state;
  }
};

describe('createStore', () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('return obj', () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).toBeDefined();
  });

  test('return obj as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('return default state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('return change state', () => {
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState().count).toEqual(1);
  });

  test('return NOT change state', () => {
    store.dispatch({ type: 'ADD' });
    expect(store.getState().count).toEqual(0);
  });

  test('call subscriber function', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'INCREMENT' });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('not call sub if unsubscribe', () => {
    const unsub = store.subscribe(handler);

    unsub.unsubscribe();

    store.dispatch({ type: 'INCREMENT' });

    expect(handler).not.toHaveBeenCalled();
  });

  test('dispatch async way', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: 'INCREMENT' });
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toEqual(1);
        resolve();
      }, 1000);
    });
  });
});

