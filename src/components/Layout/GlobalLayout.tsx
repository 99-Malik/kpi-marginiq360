'use client';

import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBarMenu from '../Sidebar/SideBarMenu';
import MenuBar from '../MenuBar/MenuBar';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setMenuOpen(!menuOpen);
  }

  const handleSidebarHover = () => {
    setMenuOpen(true);
  }

  const handleSidebarHoverLeave = () => {
    setMenuOpen(false);
  }

  const handleMenuBarHover = () => {
    setMenuOpen(true);
  }

  const handleMenuBarHoverLeave = () => {
    setMenuOpen(false);
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col scroll-hidden"
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* NavBar */}
      <NavBar onLogoClick={handleLogoClick} />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 w-full">
        <SideBarMenu 
          onHover={handleSidebarHover}
          onHoverLeave={handleSidebarHoverLeave}
        />

        {menuOpen && (
          <div 
            className="fixed inset-y-0 left-0 z-[70] transition-all duration-300 ease-in-out"
            onMouseEnter={handleMenuBarHover}
            onMouseLeave={handleMenuBarHoverLeave}
          >
            <MenuBar onClose={() => setMenuOpen(false)} />
          </div>
        )}

        <main className="flex-1 overflow-auto px-6 pt-4 bg-white border-l border-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
}
