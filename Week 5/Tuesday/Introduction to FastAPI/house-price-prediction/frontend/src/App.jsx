import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import PredictPage from './components/PredictPage'

// Map between app page keys and browser URL paths
const PAGE_TO_PATH = { home: '/', estimate: '/estimate' }
const PATH_TO_PAGE = { '/': 'home', '/estimate': 'estimate' }

const getInitialPage = () =>
  PATH_TO_PAGE[window.location.pathname] ?? 'home'

const App = () => {
  const [page, setPage] = useState(getInitialPage)
  const [displayPage, setDisplayPage] = useState(getInitialPage)
  const [transitioning, setTransitioning] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Keep state in sync when the user hits Back / Forward
  useEffect(() => {
    const onPopState = () => {
      const target = PATH_TO_PAGE[window.location.pathname] ?? 'home'
      setPage(target)
      setDisplayPage(target)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (target) => {
    if (transitioning || target === page) return
    // Push the new URL to the browser's history stack
    window.history.pushState({}, '', PAGE_TO_PATH[target])
    setTransitioning(true)
    setTimeout(() => {
      setDisplayPage(target)
      setPage(target)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setTransitioning(false)
    }, 200)
  }

  const toggleDark = () => setDarkMode((d) => !d)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={transitioning ? 'page-exit' : 'page-enter'} key={displayPage}>
        {displayPage === 'home' ? (
          <HomePage onNavigate={() => navigate('estimate')} darkMode={darkMode} toggleDark={toggleDark} />
        ) : (
          <PredictPage onBack={() => navigate('home')} darkMode={darkMode} toggleDark={toggleDark} />
        )}
      </div>
    </div>
  )
}

export default App
