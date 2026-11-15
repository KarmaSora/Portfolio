import type { ImgHTMLAttributes } from 'react'

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; unoptimized?: boolean; fill?: boolean }

export default function Image({ priority, unoptimized, fill, ...attributes }: ImageProps) {
  return <img {...attributes} loading={priority ? 'eager' : attributes.loading || 'lazy'} />
}
