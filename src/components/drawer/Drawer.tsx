import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {Button} from '../button'
import {FooterButtons} from '../modal/ModalFooter'

type DrawerProps = {
  /**
   * Drawer footer className
   */
  footerClassName?: string
  /**
   * Drawer header className
   */
  headerClassName?: string
  /**
   * Drawer content className
   */
  contentClassName?: string
  /**
   * Drawer is open or not
   */
  isOpen: boolean
  /**
   * Callback function when drawer is closed
   */
  onClose: () => void
  /**
   * Drawer content
   */
  children: React.ReactNode
  /**
   * Drawer title
   */
  title: string
  /**
   * Custom drawer header
   */
  customHeader?: React.ReactNode
  /**
   * Custom drawer footer
   */
  customFooter?: React.ReactNode
  /**
   * Drawer size
   */
  size?: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' // sm: 400px, md: 600px, lg: 820px, xlg: 1000px, xxlg: '1200px
  /**
   * Show backdrop or not
   */
  showBackdrop?: boolean
  /**
   * Show header or not
   */
  showHeader?: boolean
  /**
   * Show footer or not
   */
  showFooter?: boolean
  /**
   * footer buttons to show
   */
  buttons?: FooterButtons
  footerAddon?: React.ReactNode
  /**
   * Drawer position
   */
  drawerPosition?: 'left' | 'right'
}

export function Drawer({
  isOpen,
  onClose,
  children,
  title,
  customHeader,
  customFooter,
  size = 'md',
  showBackdrop = true,
  showHeader = true,
  showFooter = true,
  buttons,
  footerAddon,
  headerClassName,
  contentClassName,
  footerClassName,
  drawerPosition = 'right',
}: DrawerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const descriptionRef = React.useRef<HTMLDivElement>(null)
  const footerRef = React.useRef<HTMLDivElement>(null)
  const translateXOffset = drawerPosition === 'left' ? '-100%' : '100%'
  const isFullBodyHeight = !showHeader && !showFooter

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current && descriptionRef && footerRef) {
        containerRef.current.style.transform = isOpen
          ? 'translateX(0)'
          : `translateX(${translateXOffset})`
        ;(
          descriptionRef.current as HTMLDivElement
        ).style.maxHeight = `calc(100vh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
        ;(
          descriptionRef.current as HTMLDivElement
        ).style.height = `calc(100vh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
      }
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      {/* backdrop */}
      <div className={clsx(classes.backdropLayer, isOpen && classes.show)} onClick={onClose}>
        {showBackdrop && <div className={clsx(classes.backdrop, isOpen && classes.showBackdrop)} />}
      </div>

      {/* container */}
      <div
        className={clsx(classes.container, classes[size], classes[`${drawerPosition}Align`])}
        ref={containerRef}
      >
        {/* content */}
        <div className={classes.content}>
          {/* header */}
          {showHeader && (
            <div className={clsx(classes.headerContainer, headerClassName)}>
              {customHeader ? (
                customHeader
              ) : (
                <>
                  <h1 className={classes.title}>{title}</h1>
                  <button type="button" className={classes.closeBtn} onClick={onClose}></button>
                </>
              )}
            </div>
          )}
          {/* description */}
          <div
            className={clsx(
              classes.descriptionContainer,
              {[classes.fullHeight]: isFullBodyHeight},
              contentClassName,
            )}
            ref={descriptionRef}
          >
            {/* children are shown here */}
            {children}
          </div>
          {/* footer */}
          {showFooter && (
            <div className={clsx(classes.footer, footerClassName)} ref={footerRef}>
              {customFooter
                ? customFooter
                : buttons && (
                    <div className={classes.footerBtnContainer}>
                      <div className={classes.footerBtn}>
                        {buttons.map((btn, idx) => (
                          <Button
                            key={idx}
                            disabled={btn.disabled}
                            variant={btn.variant}
                            onClick={() => {
                              btn.onClick()
                              // onClose()
                            }}
                          >
                            {btn.btnText}
                          </Button>
                        ))}
                      </div>

                      {footerAddon && <div>{footerAddon}</div>}
                    </div>
                  )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
