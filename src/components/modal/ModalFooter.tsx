import clsx from 'clsx'
import classes from './styles.module.css'
import {Button} from '../button'

interface ModalFooterProps {
  /**
   * Save button click handler
   */
  onSave: () => void
  /**
   * Close button click handler
   */
  onClose?: () => void
  /**
   * Modal footer children
   * if children is passed, default buttons will not be shown
   * children acts like a custom footer
   */
  children?: React.ReactNode
  /**
   * zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any
  /**
   * show save button or not
   */
  showSaveBtn?: boolean
  /**
   * save button text
   */
  saveBtnText?: string
  /**
   * show close button or not
   */
  showCloseBtn?: boolean
  /**
   * close button text
   */
  closeBtnText?: string
  /**
   * show border or not
   */
  showBorder?: boolean
}

export function ModalFooter({
  onSave,
  onClose,
  children,
  api,
  showSaveBtn = true,
  saveBtnText = 'Save',
  showCloseBtn = true,
  closeBtnText = 'Close',
  showBorder = true,
}: ModalFooterProps) {
  return (
    <div className={clsx(classes.footer, {[classes.showBorder]: showBorder})}>
      {children ? (
        children
      ) : (
        <>
          {showCloseBtn && (
            <Button
              variant="secondary"
              onClick={() => {
                onClose && onClose()
                api?.close()
              }}
            >
              {closeBtnText}
            </Button>
          )}
          {showSaveBtn && (
            <Button
              variant="primary"
              onClick={() => {
                onSave()
                api?.close()
              }}
            >
              {saveBtnText}
            </Button>
          )}
        </>
      )}
    </div>
  )
}