import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { BaseColor } from "@/pages/site-management/registry/registry-base-colors"
import { Style } from "@/pages/site-management/registry/registry-styles"
import { getSubdomain } from "@/lib/subdomain";
import { useGetSiteSetupQuery } from "@/api/service/user_Auth_Api"
import { useEffect } from "react"

type Config = {
  style: Style["name"]
  theme: BaseColor["name"]
  radius: number
}

const defaultConfig: Config = {
  style: "default",
  theme: "zinc",
  radius: 0.5,
}

const configAtom = atomWithStorage<Config>("config", defaultConfig)

export function useConfig() {
  const { subdomain } = getSubdomain();
  const { data, isLoading } = useGetSiteSetupQuery({ type: "siteconfig" },{skip:!subdomain})
  const [config, setConfig] = useAtom(configAtom)

  useEffect(() => {
    if (data && !isLoading) {
      const apiConfig: Config = {
        style: data.style || defaultConfig.style,
        theme: data.theme || defaultConfig.theme,
        radius: data.radius || defaultConfig.radius,
      }
      setConfig(apiConfig)
    }
  }, [data, isLoading, setConfig])

  return [config, setConfig, data] as [Config, typeof setConfig, any]
}