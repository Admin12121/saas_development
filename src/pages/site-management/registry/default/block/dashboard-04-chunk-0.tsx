"use client"

import {Link} from "react-router-dom"

export default function Component() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link to="#" className="font-semibold text-primary">
        General
      </Link>
      <Link to="#">Security</Link>
      <Link to="#">Integrations</Link>
      <Link to="#">Support</Link>
      <Link to="#">Organizations</Link>
      <Link to="#">Advanced</Link>
    </nav>
  )
}
