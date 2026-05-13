'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', icon: '📊', href: '/dashboard' },
  { name: 'Chat', icon: '💬', href: '/chat' },
  { name: 'Conversations', icon: '📝', href: '/conversations' },
  { name: 'Documents', icon: '📁', href: '/documents' },
  { name: 'Users', icon: '👥', href: '/users' },
  { name: 'Settings', icon: '⚙️', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">VG Invoice AI</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}