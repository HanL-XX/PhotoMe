import React from 'react'
import Providers from './navigations'
import { Provider } from 'react-redux'
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <Providers />
    </Provider>
  )
}
