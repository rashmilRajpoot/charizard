/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

export interface EmptyStateProps {
  icon: string
  title: string
  desc: string
  flexDir?: 'row' | 'column'
  btnText?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * adapts to parent's width and height
 */
export function EmptyState({
  icon,
  title,
  desc,
  flexDir = 'column',
  btnText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className={clsx(classes.container, flexDir === 'row' && classes.containerRow)}>
      <div className={classes.huiEmptyStateIconContainer}>
        <img src={icon} alt="empty state icon" className={classes.huiEmptyStateIcon} />
      </div>
      <div>
        <h6 className={clsx(classes.title, flexDir === 'row' && classes.textRow)}>{title}</h6>
        <p className={clsx(classes.desc, flexDir === 'row' && classes.textRow)}>{desc}</p>
      </div>

      {btnText && (
        <button className={classes.btn} onClick={onClick}>
          {btnText}
        </button>
      )}
    </div>
  )
}
