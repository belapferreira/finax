import Image from 'next/image';

export const Header = () => {
  const avatar = `https://ui-avatars.com/api/?size=128&background=0891B2&color=fff&name=${encodeURIComponent('Jane Doe',)}`;

  return (
    <header className="flex w-full items-center justify-center px-5 border border-solid border-gray-800">
      <div className="py-3 flex w-full max-w-app justify-between">
        <Image
          src="/finax-logo.svg"
          width={124}
          height={28}
          alt="Finax logo"
        />

        <Image
          src={avatar}
          width={52}
          height={52}
          alt="User avatar"
          className='rounded-full'
        />
      </div>
    </header>
  );
};
