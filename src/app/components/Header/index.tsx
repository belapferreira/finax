import Image from 'next/image';

export const Header = () => {
  const avatar = `https://ui-avatars.com/api/?size=128&background=0891B2&color=fff&name=${encodeURIComponent(
    'Jane Doe',
  )}`;

  return (
    <header className="flex w-full items-center justify-center border border-l-0 border-r-0 border-t-0 border-solid border-gray-800 px-5">
      <div className="flex w-full max-w-app justify-between py-3">
        <Image src="/finax-logo.svg" width={124} height={28} alt="Finax logo" />

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
