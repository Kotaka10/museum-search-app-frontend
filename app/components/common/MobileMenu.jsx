'use client'

import { useEffect, useState } from 'react'
import { Menu, XCircle, X, Github, Instagram } from 'lucide-react'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import SearchMuseums from '@/app/components/ui/SearchMuseums'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="sm:hidden relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="p-2 focus:outline-none"
      >
        {isOpen ? <XCircle className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      </Transition>

      <Transition
        show={isOpen}
        enter="transition-transform duration-300 ease-out"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-200 ease-in"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
      <div className="fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white shadow-lg px-4 py-6 space-y-16 text-sm z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">メニュー</span>
            <button onClick={() => setIsOpen(false)} aria-label="メニューを閉じる">
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <SearchMuseums />
          <div className="flex flex-col gap-4">
            <Link href="/nearby" className="text-orange-500 hover:underline">マップ</Link>
            <Link href="/users/register" className="text-orange-500 hover:underline">会員登録</Link>
            <Link href="/users/login" className="text-orange-500 hover:underline">ログイン</Link>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Link
              href="https://github.com/your-github-id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://x.com/your-x-id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <X className="w-5 h-5" />
            </Link>
            <Link
              href="https://instagram.com/your-instagram-id"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  )
}