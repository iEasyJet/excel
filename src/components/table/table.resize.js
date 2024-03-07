import { $ } from '../../core/dom';

export function resizeHandler(type, $root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizeble"]');
  const coords = $parent.getCoords();
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
  let value;

  $resizer.css({opacity: 1});

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({right: -delta + 'px', bottom: '-100vh'});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px', right: '-100vw'});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'col') {
      cells.forEach((el) => el.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }
    $resizer.css({opacity: 0, right: 0, bottom: 0});
  };
}
