'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';

const navItem = tv({
  base: 'text-gray-400 tracking-wider',
  variants: {
    variant: {
      active: 'text-cyan-600 font-bold',
    },
  },
});

export const Header = () => {
  const currentRoute = usePathname();

  const avatar = `https://ui-avatars.com/api/?size=128&background=0891B2&color=fff&name=${encodeURIComponent(
    'Jane Doe',
  )}`;

  return (
    <header className="flex w-full items-center justify-center border border-l-0 border-r-0 border-t-0 border-solid border-gray-800 px-5">
      <div className="flex h-full w-full max-w-app justify-between py-3">
        <Image src="/finax-logo.svg" width={124} height={28} alt="Finax logo" />

        <nav className="flex h-full items-center gap-8">
          <Link
            href="/"
            className={navItem({
              variant: currentRoute === '/' ? 'active' : undefined,
            })}
          >
            Home
          </Link>

          <Link
            href="/entries"
            className={navItem({
              variant: currentRoute.startsWith('/entries')
                ? 'active'
                : undefined,
            })}
          >
            Entries
          </Link>
        </nav>

        <Image
          src={avatar}
          width={52}
          height={52}
          alt="User avatar"
          className="rounded-full"
        />
      </div>
    </header>
  );
};
