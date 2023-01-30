'use strict';

/**
 * Use React without JSX
 */
const e = React.createElement;

function App() {
  return e(
    'div',
    { className: 'container' },
    'hello word!'
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));
