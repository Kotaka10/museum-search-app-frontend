'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRestorationHandler() {
  const pathname = usePathname()

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, String(window.scrollY))
    }

    window.addEventListener('beforeunload', saveScroll)
    window.addEventListener('pagehide', saveScroll)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveScroll()
      }
    })

    return () => {
      saveScroll()
      window.removeEventListener('beforeunload', saveScroll)
      window.removeEventListener('pagehide', saveScroll)
    }
  }, [pathname])

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const savedScrollY = sessionStorage.getItem(`scroll-${pathname}`)
    if (savedScrollY !== null) {
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollY, 10))
      })
    }
  }, [pathname])

  return null
}