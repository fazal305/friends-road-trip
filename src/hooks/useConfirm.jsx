import { useCallback, useState } from 'react'
import ConfirmDialog from '../components/common/ConfirmDialog.jsx'

/**
 * Renders an accessible confirm dialog on demand instead of the native
 * window.confirm(). Usage: const { requestConfirm, confirmDialog } = useConfirm()
 * then requestConfirm({ title, description, onConfirm }) and render {confirmDialog}.
 */
export function useConfirm() {
  const [request, setRequest] = useState(null)

  const requestConfirm = useCallback((options) => setRequest(options), [])
  const close = useCallback(() => setRequest(null), [])

  const confirmDialog = (
    <ConfirmDialog
      open={!!request}
      title={request?.title ?? 'Are you sure?'}
      description={request?.description}
      confirmLabel={request?.confirmLabel}
      onCancel={close}
      onConfirm={() => {
        request?.onConfirm()
        close()
      }}
    />
  )

  return { requestConfirm, confirmDialog }
}
