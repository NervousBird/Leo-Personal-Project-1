/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './pages/App'

const routes = createRoutesFromElements(
  <Route index element={<App />}>
  </Route> />
)

export default routes
