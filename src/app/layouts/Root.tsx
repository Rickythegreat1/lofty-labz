import { Outlet } from 'react-router';

export default function Root() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-[var(--purple-500)] focus:px-4 focus:py-2 focus:text-[var(--paper)] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--brass)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
      >
        Skip to main content
      </a>
      <Outlet />
    </>
  );
}
