'use client';

import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SideBarMenu from '../../components/Sidebar/SideBarMenu';
import MenuBar from '../../components/MenuBar/MenuBar';

function Page() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogoClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* NavBar */}
      <NavBar onLogoClick={handleLogoClick} />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <SideBarMenu />

        {/* Menu Bar - Shows when open */}
        {menuOpen && (
  <>
    <div
      className="fixed inset-0 z-[55] bg-black/10"
      onClick={() => setMenuOpen(false)}
    />
    <div className="fixed inset-y-0 left-16 z-[60]">
      <MenuBar onClose={() => setMenuOpen(false)} />
    </div>
  </>
)}

        {/* Main Page Content - Independent width and length */}
        <main className="flex-1 overflow-auto p-6 pt-4 bg-gray-50 border-l border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Purchases Counts</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Purchasing Items content will go here...</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
