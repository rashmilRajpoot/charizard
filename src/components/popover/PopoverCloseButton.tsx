import clsx from 'clsx'

interface PopoverCloseButtonProps {
  /**
   * The content of the close button.
   */
  children: React.ReactNode
  /**
   * The popover API object.
   */
  api?: any
  /**
   * The styles to apply to the PopoverCloseButton.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverCloseButton.
   */
  className?: string
}

export default function PopoverCloseButton({
  children,
  api,
  styles,
  className,
}: PopoverCloseButtonProps) {
  return (
    <button
      {...api?.closeTriggerProps}
      style={styles}
      className={clsx('reset-btn', className)}
      onClick={api?.close}
    >
      {children}
    </button>
  )
}