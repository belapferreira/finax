import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  cta: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const { className, cta, ...rest } = props;
    return (
      <button
        {...rest}
        ref={forwardedRef}
        className={twMerge(
          'w-fit min-w-fit rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold uppercase enabled:hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
      >
        {cta}
      </button>
    );
  },
);

Button.displayName = 'Button';
