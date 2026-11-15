import { useMemo, type AnchorHTMLAttributes, type ReactNode } from 'react'

export function routeHref(href: string) {
  return href.startsWith('/') ? `#${href}` : href
}

export default function Link({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode; prefetch?: boolean }) {
  const { prefetch, ...attributes } = props
  return <a {...attributes} href={routeHref(href)}>{children}</a>
}

export function useRouter() {
  return useMemo(() => ({
    push: (href: string) => { window.location.hash = routeHref(href) },
    replace: (href: string) => { window.location.replace(routeHref(href)) },
    back: () => window.history.back(),
  }), [])
}
