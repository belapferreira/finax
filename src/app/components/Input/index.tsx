import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value: string;
  icon?: IconType;
  name?: string;
}

export const Input = ({
  value,
  placeholder,
  onChange,
  icon: Icon,
  className,
  name,
  ...rest
}: InputProps) => {
  return (
    <div
      className={twMerge(
        'flex items-center gap-2 rounded-md border border-gray-800 px-4 py-2 shadow-sm outline-none focus-within:border-cyan-600',
        className,
      )}
    >
      {Icon && <Icon size={20} color="#9ca3af" />}

      <input
        {...rest}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="flex w-full flex-1 border-0 bg-transparent p-0 text-end text-gray-100 placeholder-gray-400 outline-none focus:ring-0"
      />
    </div>
  );
};
