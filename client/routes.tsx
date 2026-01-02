/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './pages/App'
import Welcome from './pages/Welcome'
import Home from './pages/Home'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Welcome />} />
    <Route path="/home" element={<Home />} />
  </Route>
)

export default routes
