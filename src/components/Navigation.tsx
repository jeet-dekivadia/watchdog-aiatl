import Link from 'next/link';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-brand-purple-900">
                Watchdog AI ATL
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/star-credibility">
              <Button variant="ghost">Star Credibility</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
