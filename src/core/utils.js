export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

export function stylesToString(styles = {}) {
  return Object.keys(styles)
      .map((key) => {
        return `${camelToDashCase(key)}: ${styles[key]}`;
      }).join('; ');
}

export function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
