'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchMuseums() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    const query = new URLSearchParams({ keyword }).toString();
    router.push(`/museums?${query}`)
    setIsSearchOpen(false)
    setKeyword('')
  }

  return (
    <>
      <div ref={containerRef} className="relative">
        <button
            className="flex items-center gap-1 text-orange-500 hover:underline"
            onClick={() => {
              setIsSearchOpen(true)
              setTimeout(() => inputRef.current?.focus(), 0)
            }}
        >
            <Search className="w-5 h-5" />
            <span className="text-sm">検索</span>
        </button>

        {isSearchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute left-0 mt-2 bg-gray-100 border rounded shadow-lg p-1 z-50 flex items-center gap-2 w-60"
            >
              <input
                  ref={inputRef}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="検索ワードを入力"
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                  type="submit"
                  className="text-sm bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
              >
                  <Search className="w-5 h-5" />
              </button>
            </form>
        )}
      </div>
    </>
  )
}