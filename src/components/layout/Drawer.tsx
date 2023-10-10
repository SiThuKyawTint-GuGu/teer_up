'use client';
import React, { ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

import '@/styles/drawer.css';

export const HamburgerDrawer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const checkbox = useRef<any>(null);

  const handleEscKey = (event: any) => {
    // Closes the navigation drawer by pressing Esc key.
    if ('Escape' === event.key) {
      checkbox.current.checked = false;
    }
  };

  const handleKeyup = (event: any) => {
    if ('Enter' === event.key) {
      checkbox.current.checked = !checkbox.current.checked;
    }
  };

  const handleClick = () => {
    document.documentElement.classList.toggle('HamburgerDrawer-open');
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey);
    return () => document.removeEventListener('keyup', handleEscKey);
  }, []);

  return (
    <div>
      <nav className={cn('HamburgerDrawer', className)} aria-label="Main menu">
        <input
          ref={checkbox}
          type="checkbox"
          id="HamburgerDrawer-toggle"
          aria-label="Toggle menu"
          onKeyUp={handleKeyup}
          onClick={handleClick}
        />
        <label htmlFor="HamburgerDrawer-toggle" tabIndex={-1} aria-hidden="true" hidden>
          Close menu
        </label>
        <div className="HamburgerDrawer-icon" role="button" aria-label="Toggle menu">
          <span></span>
        </div>
        <div className="HamburgerDrawer-panel">{children}</div>
      </nav>
    </div>
  );
};

export default HamburgerDrawer;
