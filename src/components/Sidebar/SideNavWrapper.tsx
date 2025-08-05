'use client';

import React, { useState, useRef, useEffect } from 'react';
import SideBarMenu from './SideBarMenu';
import MenuBar from '../MenuBar/MenuBar';
import NavBar from '../NavBar/NavBar';

interface SideNavWrapperProps {
  children: React.ReactNode;
}

const SideNavWrapper: React.FC<SideNavWrapperProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    console.log('[SideNavWrapper] handleLogoClick fired');
    setMenuOpen((prev) => {
      console.log('[SideNavWrapper] menuOpen state before:', prev);
      return !prev;
    });
  };

  useEffect(() => {
    console.log('[SideNavWrapper] menuOpen changed:', menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen w-full flex flex-col" ref={wrapperRef}>
      {/* NavBar */}
      <NavBar onLogoClick={handleLogoClick} />
  
      {/* Sidebar + Content */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <SideBarMenu />
  
        {/* FIX: Use a fixed, top-aligned panel next to the 64px sidebar */}
        {menuOpen && (
          <>
            {/* optional backdrop */}
            <div
              className="fixed inset-0 z-[55] bg-black/10"
              onClick={() => setMenuOpen(false)}
            />
  
            <div className="fixed inset-y-0 left-16 z-[60]">
              <MenuBar onClose={() => setMenuOpen(false)} />
            </div>
          </>
        )}
  
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 pt-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
  
};

export default SideNavWrapper;
