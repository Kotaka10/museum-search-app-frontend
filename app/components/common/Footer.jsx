'use client'

import { Github, X, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between sm:justify-center sm:gap-8 text-sm text-gray-600">
        <p className="mb-2 sm:mb-0">
          © 2025 古宮　隆宏 All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/kotaka10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-black transition"
          >
            <Github className="w-5 sm:w-8 h-5 sm:h-8" />
          </Link>
          <Link
            href="https://x.com/pY5UGKb5eYUpJFZ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-black transition"
          >
            <X className="w-5 sm:w-8 h-5 sm:h-8" />
          </Link>
          <Link
            href="https://www.instagram.com/taka.1243"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-black transition"
          >
            <Instagram className="w-5 sm:w-8 h-5 sm:h-8" />
          </Link>
        </div>
      </div>
    </footer>
  )
}