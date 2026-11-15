import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { sha256 } from 'js-sha256'
import Home from '../../../projects/showcase-serl/src/app/page'
import Header from '../../../projects/showcase-serl/src/app/components/Header'
import Footer from '../../../projects/showcase-serl/src/app/components/Footer'
import SingleProject from '../../../projects/showcase-serl/src/app/components/singleProject'
import KioskPage from '../../../projects/showcase-serl/src/app/components/KioskPage'
import KioskSingleProject from '../../../projects/showcase-serl/src/app/components/KioskSingleProject'
import { routeHref } from './navigation'

interface ResearchRecord {
  id: string
  date: string
  researchType: string
  title: string
  description: string
  tags: string[]
  screenshots: string[]
  researchURL: string
}

// Match the original server routes' defaults and the original Container's IDs.
function normalize(item: Partial<ResearchRecord>, placeholder: string): ResearchRecord {
  return {
    id: item.id || sha256(`${item.title}-${item.date}-${item.researchType}`).slice(0, 16),
    date: item.date || 'Unknown Date',
    researchType: item.researchType || 'Unknown Type',
    title: item.title || 'Untitled',
    description: item.description || 'No description available.',
    tags: item.tags || ['undef'],
    screenshots: item.screenshots || [placeholder],
    researchURL: item.researchURL || '#',
  }
}

function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/')
  const [records, setRecords] = useState<ResearchRecord[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const changeRoute = () => {
      setRoute(window.location.hash.slice(1) || '/')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', changeRoute)
    return () => window.removeEventListener('hashchange', changeRoute)
  }, [])

  useEffect(() => {
    // Repository pages cannot load inside an iframe; keep their native links usable.
    const openExternal = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (anchor && /^https?:\/\//.test(anchor.href) && new URL(anchor.href).origin !== window.location.origin) {
        anchor.target = '_blank'
        anchor.rel = 'noopener noreferrer'
      }
    }
    document.addEventListener('click', openExternal, true)
    return () => document.removeEventListener('click', openExternal, true)
  }, [])

  useEffect(() => {
    const base = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '')
    Promise.all([
      fetch(`${base}/research.json`).then(response => { if (!response.ok) throw new Error('Data unavailable'); return response.json() }),
      fetch(`${base}/placeholder.txt`).then(response => response.text()),
    ]).then(([data, placeholder]) => setRecords(data.map((record: Partial<ResearchRecord>) => normalize(record, placeholder))))
      .catch(() => setError(true))
  }, [])

  if (route === '/') return <Home />
  if (error) return <p>Unable to load project data. <a href='#/'>Return to home page</a></p>
  if (!records.length) return <p>Loading...</p>
  if (route.replace(/\/$/, '') === '/kiosk') return <KioskPage ResearchDataToDisplay={records} />

  const match = route.match(/^\/(card|kiosk)\/([^/]+)\/?$/)
  const record = match && records.find(item => item.id === decodeURIComponent(match[2]))
  if (!match || !record) return <><Header /><p>Project not found. <a href={routeHref('/')}>Return to home page</a></p><Footer /></>
  return match[1] === 'card'
    ? <><Header /><SingleProject {...record} screenshots={[...record.screenshots]} /><Footer /></>
    : <KioskSingleProject data={records} currentId={record.id} />
}

createRoot(document.getElementById('showcase-root')!).render(<App />)
