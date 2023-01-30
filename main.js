'use strict';

/**
 * Use React without JSX
 */
const e = React.createElement;
const { useState, useEffect } = React;

function Inputs({ unitName, setUnitName, currency, setCurrency, decimal, setDecimal }) {
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
    ),
    e(
      'label',
      { className: 'input-label' },
      'Decimals/小数位数:',
      e(
        'input',
        { type: 'text', value: decimal, onChange: (e) => setDecimal(e.target.value) },
        null
      )
    )
  )
}

function Input({ val, onChange }) {
  return e(
    'input',
      { type: 'text', value: val, onChange },
      null
  )
}

function CompareTabe({ unitName, currency, decimal }) {
  const [items, setItems] = useState([])

  const handleAdd = () => {
    setItems([
      ...items,
      { qty: '', amount: '', unitPrice: '' }
    ])
  }

  const handleChange = (key, index, e) => {
    const tmpArr = items.slice(0)
    const tmpObj = tmpArr[index]
    tmpObj[key] = e.target.value
    if (tmpObj['qty'] && tmpObj['amount']) {
      tmpObj['unitPrice'] = (Number(tmpObj['amount']) / Number(tmpObj['qty'])).toFixed(decimal)
    }
    setItems(tmpArr)
  }

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
          e(
            'button',
            { className: 'add-btn', onClick: handleAdd },
            '+ 新增'
          )
        ),
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
    e(
      'tbody',
      null,
      items.map((i, index) => {
        return e(
          'tr',
          { key: index },
          e(
            'td',
            null,
            index + 1
          ),
          e(
            'td',
            null,
            e(Input, {
              val: i.qty,
              onChange: (e) => { handleChange('qty', index, e)}
            })
          ),
          e(
            'td',
            null,
            e(Input, {
              val: i.amount,
              onChange: (e) => { handleChange('amount', index, e)}
            })
          ),
          e(
            'td',
            null,
            i.unitPrice
          ),
        )
      })
    )
  )
}

function App() {
  const [unitName, setUnitName] = useState('')
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || '')
  const [decimal, setDecimal] = useState(4) // 默认保留4位小数

  return e(
    'div',
    { className: 'container' },
    e(Inputs, {
      unitName, setUnitName,
      currency, setCurrency,
      decimal, setDecimal
    }),
    e(CompareTabe, {
      unitName,
      currency,
      decimal
    })
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));
