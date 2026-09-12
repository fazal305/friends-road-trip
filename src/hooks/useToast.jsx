import { useCallback, useEffect, useRef, useState } from 'react'
import Toast from '../components/common/Toast.jsx'

/**
 * Shows a brief success confirmation toast on demand. Usage:
 * const { showToast, toast } = useToast()
 * then showToast('Expense added.') and render {toast}.
 */
export function useToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  const showToast = useCallback((text) => {
    clearTimeout(timeoutRef.current)
    setMessage(text)
    setVisible(true)
    timeoutRef.current = setTimeout(() => setVisible(false), 2400)
  }, [])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const toast = <Toast message={message} visible={visible} />

  return { showToast, toast }
}
