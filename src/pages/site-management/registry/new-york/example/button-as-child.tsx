import {Link} from "react-router-dom"

import { Button } from "@/pages/site-management/registry/new-york/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link to="/login">Login</Link>
    </Button>
  )
}
