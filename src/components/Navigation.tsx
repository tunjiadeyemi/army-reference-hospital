import { useState } from 'react';
import { Link } from 'react-router';
import { useLocation } from 'react-router';

import { navigationItems } from '../utils/constants';
import type { ExpandedItems, HandleSubmenuClick, NavigationItem } from '../utils/types';

const NavigationMenu = () => {
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const location = useLocation();
  const currentPath = location.pathname;

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev: ExpandedItems) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  interface HandleItemClick {
    (itemId: string): void;
  }

  const handleItemClick: HandleItemClick = (itemId) => {
    if (navigationItems.find((item: NavigationItem) => item.id === itemId)?.hasSubmenu) {
      toggleExpanded(itemId);
    }
  };

  const handleSubmenuClick: HandleSubmenuClick = () => {};

  return (
    <div className="px-7 w-[25%] bg-[#2D403D] text-white pt-10 h-[100vh] overflow-hidden overflow-y-scroll hide-scrollbar">
      {/* Header */}
      <div className="p-4 flex flex-col items-center space-y-3">
        <img src="/logo.svg" alt="Logo" />

        <h2 className="text-xl font-semibold w-full text-center">
          44 Nigerian Army Reference Hospital
        </h2>
      </div>

      {/* Navigation Items */}
      <div className="mt-5">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          // Check if current path matches this item's route
          const isActive = item.rout && currentPath.startsWith(item.rout);
          // For submenu, check if any submenu route matches
          const isSubmenuActive = item.submenuItems?.some(
            (subItem) => subItem.rout && currentPath.startsWith(subItem.rout)
          );
          const isExpanded = expandedItems[item.id] || isActive || isSubmenuActive;

          return (
            <div key={item.id} className="mb-3">
              {/* Main Item */}
              <Link
                to={item.rout || '#'}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer hover:bg-[#67DFCE] transition-colors ${
                  (isActive && !item.hasSubmenu) || isSubmenuActive
                    ? 'bg-[#67DFCE] text-[#2D403D] hover:bg-[#67DFCE]'
                    : ''
                } ${isExpanded ? 'bg-[#67DFCE]' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent size={18} color={`${isExpanded ? '#2D403D' : '#F5F5F5'}`} />
                  <span
                    className={`text-sm font-medium ${
                      (isActive && !item.hasSubmenu) || isSubmenuActive
                        ? 'text-[#2D403D]'
                        : 'text-white'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.hasSubmenu && (
                  <div className="text-white">
                    {isExpanded ? (
                      <img src="/chevron-down.svg" alt="chevron-down" />
                    ) : (
                      <img src="/chevron-left.svg" alt="chevron-left" />
                    )}
                  </div>
                )}
              </Link>

              {/* Submenu Items */}
              {item.hasSubmenu && isExpanded && (
                <div className="bg-[#2C4C48]">
                  {item.submenuItems?.map((subItem, index) => {
                    const isSubActive = subItem.rout && currentPath.startsWith(subItem.rout);
                    return (
                      <Link
                        key={index}
                        to={subItem.rout || '#'}
                        onClick={() => handleSubmenuClick(item.id, subItem.action)}
                        className={`w-full flex items-center py-2 cursor-pointer border-l border-white text-left text-sm hover:bg-[#16695D] transition-colors ${
                          isSubActive ? 'bg-[#16695D]' : ''
                        }`}
                      >
                        <div className="mr-2 w-6 h-0.5 bg-white" />
                        <span className="font-medium">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationMenu;
