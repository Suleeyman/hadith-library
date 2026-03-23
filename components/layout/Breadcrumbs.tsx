'use client'

import Link from 'next/link';

export type Breadcrumb = Array<{ label: string; href: string }>


export default function Breadcrumbs({crumbs}: {crumbs: Breadcrumb}) {
 

  return (
    <div aria-label="Breadcrumb" className="breadcrumbs text-sm">
      <ol>
        {crumbs && crumbs.map((crumb) => {
          return (
            <li key={crumb.href}>
              <Link className="link link-hover" href={crumb.href}>
                {crumb.label}
              </Link>
            </li>
          )}
        )}
      </ol>
    </div>
  )
}
