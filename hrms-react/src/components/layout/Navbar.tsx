import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hiddenItems, setHiddenItems] = useState<number[]>([]);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', link: '/' },
    { label: 'Attendance', link: '/attendance' },
    { label: 'Leave', link: '/leave' },
    { label: 'Payroll', link: '/payroll' },
    { label: 'Projects', link: '/projects' },
    { label: 'Departments', link: '/departments' },
    { label: 'Reports', link: '/reports' },
    { label: 'Settings', link: '/settings' },
  ] as const;

  const handleNavigation = (link: string) => {
    navigate(link);
    setIsMoreMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const calculateVisibleItems = () => {
      const container = menuRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const moreButtonWidth = 80; // Approximate width of "More" button
      const itemWidth = 120; // Approximate width of each menu item
      const availableWidth = containerWidth - moreButtonWidth;
      const maxVisibleItems = Math.floor(availableWidth / itemWidth);

      if (maxVisibleItems >= menuItems.length) {
        setVisibleItems(menuItems.map((_, index) => index));
        setHiddenItems([]);
      } else {
        setVisibleItems(menuItems.map((_, index) => index).slice(0, maxVisibleItems));
        setHiddenItems(menuItems.map((_, index) => index).slice(maxVisibleItems));
      }
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center px-4 md:px-0">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">HRMS</h1>
            </div>
          </div>
          <div className="flex items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4" ref={menuRef}>
              {visibleItems.map((index) => (
                <button
                  key={index}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => handleNavigation(menuItems[index].link)}
                >
                  {menuItems[index].label}
                </button>
              ))}
              {hiddenItems.length > 0 && (
                <div className="relative">
                  <button
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  >
                    More
                  </button>
                  {isMoreMenuOpen && (
                    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      {hiddenItems.map((index) => (
                        <button
                          key={index}
                          className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleNavigation(menuItems[index].link)}
                        >
                          {menuItems[index].label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden relative">
              <button
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </button>
              {isMobileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleNavigation(item.link)}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
