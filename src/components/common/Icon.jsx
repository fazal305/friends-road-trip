/**
 * Small inline icon set (no external icon library). Each path uses
 * currentColor so icons inherit color from their CSS context.
 */
const PATHS = {
  dashboard: 'M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-16v5h6V4h-6Z',
  itinerary: 'M8 2v3M16 2v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  route: 'M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.5 15 15.5 8M9 16l6-9',
  friends: 'M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9 10v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75',
  expenses: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  packing: 'M4 8h16l-1.5 12h-13L4 8Zm4 0V6a4 4 0 0 1 8 0v2',
  places: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  food: 'M6 2v7a3 3 0 0 0 3 3v10M6 2v9M9 2v9M3 2v9m15-9v20m0-20a4 4 0 0 0-4 4v6h4',
  polls: 'M4 20V10m7 10V4m7 16v-7',
  notes: 'M5 4h14v16l-3-2-3 2-3-2-3 2V4Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 0-.15-1.5l2-1.5-2-3.5-2.3.9a8 8 0 0 0-2.6-1.5L14.5 2h-5l-.45 2.9a8 8 0 0 0-2.6 1.5l-2.3-.9-2 3.5 2 1.5A8 8 0 0 0 4 12c0 .5.05 1 .15 1.5l-2 1.5 2 3.5 2.3-.9c.76.64 1.63 1.15 2.6 1.5L9.5 22h5l.45-2.9a8 8 0 0 0 2.6-1.5l2.3.9 2-3.5-2-1.5c.1-.5.15-1 .15-1.5Z',
  sun: 'M12 4V2m0 20v-2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4M18.4 5.6l1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M20 6 9 17l-5-5',
  plus: 'M12 5v14M5 12h14',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  trash: 'M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z',
  star: 'M12 2l2.9 6.4 7 .7-5.3 4.8 1.6 6.9L12 17.3 5.8 20.8l1.6-6.9L2.1 9.1l7-.7Z',
  calendar: 'M8 2v3M16 2v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  car: 'M5 17h14M5 17a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m6 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0M3 17v-4l2-5h14l2 5v4',
  fuel: 'M3 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 10h10M16 7l3 3v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-4l-2-3h-2',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  arrowDown: 'M12 5v14M19 12l-7 7-7-7',
  bed: 'M3 18v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3h6a2 2 0 0 1 2 2v2M3 18h18M3 18v3M21 18v3M7 12V8a2 2 0 0 1 2-2h1',
  camera: 'M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm8 3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
}

export default function Icon({ name, size = 20, strokeWidth = 1.8, className, ...rest }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={path} />
    </svg>
  )
}
