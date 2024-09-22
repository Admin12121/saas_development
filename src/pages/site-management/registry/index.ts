import { blocks } from "@/pages/site-management/registry/registry-blocks"
import { charts } from "@/pages/site-management/registry/registry-charts"
import { examples } from "@/pages/site-management/registry/registry-examples"
import { hooks } from "@/pages/site-management/registry/registry-hooks"
import { lib } from "@/pages/site-management/registry/registry-lib"
import { themes } from "@/pages/site-management/registry/registry-themes"
import { ui } from "@/pages/site-management/registry/registry-ui"
import { Registry } from "@/pages/site-management/registry/schema"

export const registry: Registry = [
  ...ui,
  ...examples,
  ...blocks,
  ...charts,
  ...lib,
  ...hooks,
  ...themes,
]
