import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CalendarApp } from './CalendarApp'
import './index.css'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CalendarApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
