import * as React from 'react'
import * as zagTabs from '@zag-js/tabs'
import clsx from 'clsx'
import classes from './layout-tabs.module.css'
import {normalizeProps, useMachine} from '@zag-js/react'

interface LayoutTabsProps {
  tabClassName?: string
  /**
   * tabs to render
   */
  tabs: Array<{label: string; value: string; content: React.ReactNode | string}>
  /**
   * default value (initial tab to render)
   */
  defaultValue: string
}

const SEARCH_PARAM_KEY = 'active-tab'

export function LayoutTabs({tabs, defaultValue, tabClassName}: LayoutTabsProps) {
  const {searchParams, href} = React.useMemo(() => new URL(window.location.href), [])
  const value = searchParams.get(SEARCH_PARAM_KEY) ?? defaultValue

  React.useEffect(() => {
    if (searchParams.has(SEARCH_PARAM_KEY)) return
    searchParams.append(SEARCH_PARAM_KEY, value)
    location.search = searchParams.toString()
  }, [])

  const [state, send] = useMachine(
    zagTabs.machine({
      id: React.useId(),
      value,
      onValueChange(details) {
        const value = details.value as string
        searchParams.set(SEARCH_PARAM_KEY, value)
        location.search = searchParams.toString()
      },
    }),
  )

  const api = zagTabs.connect(state, send, normalizeProps)

  return (
    <div {...api.rootProps}>
      <div {...api.tablistProps} className={clsx(classes.tabList, tabClassName)}>
        {tabs.map(item => (
          <button
            {...api.getTriggerProps({value: item.value})}
            key={item.value}
            className={classes.tab}
            data-text={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tabs.map(item => (
        <div {...api.getContentProps({value: item.value})} key={item.value}>
          {item.content}
        </div>
      ))}
    </div>
  )
}
