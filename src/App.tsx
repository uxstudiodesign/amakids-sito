import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChiSiamo from './pages/ChiSiamo'
import Manifesto from './pages/Manifesto'
import DiventaSocio from './pages/DiventaSocio'
import Contatti from './pages/Contatti'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

function paginePerLingua(prefisso: string) {
  return (
    <Route key={prefisso || 'it'} path={prefisso === '' ? '/' : prefisso} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="chi-siamo" element={<ChiSiamo />} />
      <Route path="manifesto" element={<Manifesto />} />
      <Route path="diventa-socio" element={<DiventaSocio />} />
      <Route path="contatti" element={<Contatti />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
}

export default function App() {
  return (
    <Routes>
      {paginePerLingua('')}
      {paginePerLingua('/en')}
    </Routes>
  )
}
