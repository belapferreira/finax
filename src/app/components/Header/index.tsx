'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { IoMenu, IoClose, IoFlashSharp } from 'react-icons/io5';

const navItem = tv({
  base: 'text-gray-400 tracking-wider',
  variants: {
    variant: {
      active: 'text-cyan-600 font-bold',
    },
  },
});

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const currentRoute = usePathname();

  const navRef = useRef<HTMLElement>(null);

  const avatar = `https://ui-avatars.com/api/?size=128&background=0891B2&color=fff&name=${encodeURIComponent(
    'Jane Doe',
  )}`;

  const handleOpenMenu = () => {
    setIsVisible((previous) => !previous);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event?.target as HTMLElement;

      if (!navRef.current?.contains(target)) {
        setIsVisible(false);
      }
    },
    [navRef],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <header className="flex w-full items-center justify-center border border-l-0 border-r-0 border-t-0 border-solid border-gray-800 px-5">
      <div className="flex h-full w-full max-w-app items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/finax-logo.svg"
              width={124}
              height={28}
              alt="Finax logo"
            />
          </Link>

          <button onClick={handleOpenMenu} className="md:hidden">
            {isVisible ? (
              <IoClose size={24} className="text-gray-400" />
            ) : (
              <IoMenu size={24} className="text-gray-400" />
            )}
          </button>
        </div>

        <nav
          ref={navRef}
          className={twMerge(
            'invisible z-50 flex h-full w-0 items-center gap-8 md:visible md:w-fit',
            isVisible &&
              'visible absolute left-36 top-16 h-fit w-fit flex-col rounded-md bg-gray-800 p-4 pr-6',
          )}
        >
          <span className="absolute -top-[0.375rem] left-4 inline-block h-3.5 w-3.5 origin-center rotate-45 rounded-sm bg-gray-800 md:hidden" />
          <Link
            href="/"
            onClick={handleOpenMenu}
            className={navItem({
              variant: currentRoute === '/' ? 'active' : undefined,
            })}
          >
            Home
          </Link>

          <Link
            href="/entries"
            onClick={handleOpenMenu}
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
          className="h-12 w-12 rounded-full md:h-[3.25rem] md:w-[3.25rem]"
        />
      </div>
    </header>
  );
};
