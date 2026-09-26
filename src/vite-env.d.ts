/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSUBMIT_ENDPOINT: string;
  readonly VITE_PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
