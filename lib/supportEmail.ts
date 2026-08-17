import getConfig from "next/config";

export const DEFAULT_SUPPORT_EMAIL = "support@onehealth.com";

export function getSupportEmail(): string {
  return (
    getConfig()?.publicRuntimeConfig?.supportEmail || DEFAULT_SUPPORT_EMAIL
  );
}
