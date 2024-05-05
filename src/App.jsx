import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import FooterPart from './components/Footer/FooterPart'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='max-w-screen mx-auto'>
      <ScrollToTop/>
      < NavBar />

      <div className='min-h-screen '>
        < Breadcrumbs />
        <hr />
        < Outlet />
      </div>
      < FooterPart />
    </div>
  )
}

export default App
