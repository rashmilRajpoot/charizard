import classes from './breadcrumbs.module.css'
import {Link} from 'react-router-dom'
import {clsx} from 'clsx'
import {useBreadcrumbsStore} from './store'

export function Breadcrumbs() {
  const {breadcrumbs} = useBreadcrumbsStore()

  if (breadcrumbs.length <= 3) {
    return (
      <nav aria-label="Breadcrumb">
        <ol className={classes.box}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.label}
              aria-current={breadcrumb.active}
              className={clsx(classes.item, breadcrumb.active && classes.active)}
            >
              <Link to={breadcrumb.href || ''} className={clsx('zap-content-medium', classes.link)}>
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 ? <span className={classes.separator}>/</span> : null}
            </li>
          ))}
        </ol>
      </nav>
    )
  }

  const firstBreadcrumb = breadcrumbs[0]
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  const middleBreadcrumbs = breadcrumbs.slice(1, -1)

  return (
    <nav aria-label="Breadcrumb">
      <ol className={classes.box}>
        <li className={clsx(classes.item)}>
          <Link
            to={firstBreadcrumb.href || ''}
            className={clsx('zap-content-medium', classes.link)}
          >
            {firstBreadcrumb.label}
          </Link>
          <span className={classes.separator}>/</span>
        </li>

        <li className={clsx(classes.item, classes.ellipsis)}>
          <span>...</span>
          <ul className={classes.dropdown}>
            {middleBreadcrumbs.map(breadcrumb => (
              <li key={breadcrumb.label}>
                <Link
                  to={breadcrumb.href || ''}
                  className={clsx('zap-content-medium', classes.link)}
                >
                  {breadcrumb.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className={classes.separator}>/</span>
        </li>

        <li className={clsx(classes.item, classes.active)}>
          <Link to={lastBreadcrumb.href || ''} className={clsx('zap-content-medium', classes.link)}>
            {lastBreadcrumb.label}
          </Link>
        </li>
      </ol>
    </nav>
  )
}