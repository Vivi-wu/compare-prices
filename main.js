'use strict';

/**
 * Use React without JSX
 */
const e = React.createElement;
const { useState, useEffect } = React;

function Inputs({
  unitName,
  setUnitName,
  currency,
  setCurrency
}) {

  const handleBlur = (e) => {
    localStorage.setItem('currency') = e.target.value || ''
  }

  return e(
    'section',
    null,
    e(
      'label',
      { className: 'input-label' },
      'Sale Unit/销售单位:',
      e(
        'input',
        { type: 'text', value: unitName, onChange: (e) => setUnitName(e.target.value) },
        null
      )
    ),
    e(
      'label',
      { className: 'input-label' },
      'Currency/货币单位:',
      e(
        'input',
        { type: 'text', value: currency, onChange: (e) => setCurrency(e.target.value), onBlur: handleBlur },
        null
      )
    )
  )
}

function CompareTabe({
  unitName,
  currency
}) {
  return e(
    'table',
    { className: 'table' },
    e(
      'thead',
      null,
      e(
        'tr',
        null,
        e(
          'th',
          null,
          unitName
        ),
        e(
          'th',
          null,
          currency
        ),
        e(
          'th',
          null,
          `${currency}/${unitName}`
        )
      )
    ),
  )
}

function App() {
  const [unitName, setUnitName] = useState('')
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || '')

  return e(
    'div',
    { className: 'container' },
    e(Inputs, {
      unitName,
      setUnitName,
      currency,
      setCurrency
    }),
    e(CompareTabe, {
      unitName,
      currency
    })
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));
