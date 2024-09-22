import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { ColorFormat } from "@/pages/site-management/lib/colors"
import { useMounted } from "@/pages/site-management/hooks/use-mounted"

type Config = {
  format: ColorFormat
}

const colorsAtom = atomWithStorage<Config>("colors", {
  format: "hsl",
})

export function useColors() {
  const [colors, setColors] = useAtom(colorsAtom)
  const mounted = useMounted()

  return {
    isLoading: !mounted,
    format: colors.format,
    setFormat: (format: ColorFormat) => setColors({ format }),
  }
}
