import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description: string;
}

/**
 * Phase 4 / #40 — per-page <title> and <meta name="description"> setter.
 *
 * Sets the document title and the description meta tag on mount, restoring
 * neither on unmount (the next route's hook overwrites them in order). We
 * deliberately keep this dependency-free rather than pulling in
 * react-helmet-async, which would add ~10 kB for two attributes.
 */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (document.title !== title) {
      document.title = title;
    }

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    if (meta.getAttribute('content') !== description) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
