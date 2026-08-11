import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Itinerary from './pages/Itinerary.jsx'
import RoutePage from './pages/Route.jsx'
import Friends from './pages/Friends.jsx'
import Expenses from './pages/Expenses.jsx'
import Packing from './pages/Packing.jsx'
import Places from './pages/Places.jsx'
import Food from './pages/Food.jsx'
import Polls from './pages/Polls.jsx'
import Notes from './pages/Notes.jsx'
import Settings from './pages/Settings.jsx'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/route" element={<RoutePage />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="/places" element={<Places />} />
          <Route path="/food" element={<Food />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
