'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GreetingProps {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const storedGreeting = sessionStorage.getItem('greeting')
    if (!storedGreeting) {
      sessionStorage.setItem('greeting', 'true')
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={name}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7 }}
          className="mr-2 p-2 text-sm font-medium text-muted-foreground"
        >
          Olá, {name}!
        </motion.div>
      )}
    </AnimatePresence>
  )
}
