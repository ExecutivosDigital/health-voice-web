/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type FieldProps = {
  className?: string;
  classInput?: string;
  label?: string;
  textarea?: boolean;
  note?: string;
  type?: string;
  value: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  disabled?: boolean;
  Svg?: ReactNode;
  maxLength?: number;
};

const Field = ({
  className,
  classInput,
  label,
  textarea,
  note,
  type,
  value,
  disabled,
  onChange,
  placeholder,
  required,
  icon,
  Svg,
  maxLength,
}: FieldProps) => {
  const handleKeyDown = (event: any) => {
    const remainingChars = 880 - value.length;
    if (remainingChars <= 0 && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  const remainingChars = 880 - value.length;

  return (
    <div className={`${className}`}>
      <div className="relative">
        {label && (
          <div className="mb-0.5 flex font-semibold 2xl:mb-2">
            {label}
            {textarea && (
              <span className="text-n-4/50 ml-auto pl-4">{remainingChars}</span>
            )}
          </div>
        )}
        <div className="relative">
          {Svg && (
            <svg className="text-[rgb(108 114 117 / 0.5)] pointer-events-none absolute top-2 left-2 h-10 transition-colors 2xl:top-3.5 2xl:h-13">
              {Svg}
            </svg>
          )}
          {textarea ? (
            <textarea
              className={`bg-n-2 border-n-2 base2 text-n-7 placeholder:text-n-4/50 dark:bg-n-8 dark:border-n-6 dark:text-n-3 dark:focus:bg-n-8 h-24 w-full resize-none rounded-md border-2 px-3.5 py-3 transition-colors outline-none focus:bg-transparent ${
                (icon || Svg) && "pl-[3.125rem]"
              } ${value !== "" && "dark:bg-n-8 border-n-3/50 bg-transparent"}`}
              value={value}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              maxLength={maxLength}
            ></textarea>
          ) : (
            <input
              className={twMerge(
                `bg-n-2 border-n-2 base2 placeholder:text-n-4/50 dark:bg-n-8 dark:border-n-6 dark:text-n-3 dark:focus:bg-n-8 h-10 w-full rounded-md border-2 px-3.5 text-white transition-colors outline-none focus:border-white/20 focus:bg-transparent 2xl:h-13 dark:focus:border-white/20 ${
                  (icon || Svg) && "pl-[3.125rem]"
                } ${
                  value !== "" && "dark:bg-n-8 border-white/20 bg-transparent"
                } ${classInput}`,
              )}
              type={type || "text"}
              autoCapitalize="off"
              value={value}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              maxLength={maxLength}
            />
          )}
        </div>
        {note && <div className="base2 text-n-4/50 mt-2">{note}</div>}
        {/* <div className="mt-2 caption2 text-accent-1">
                Email is incorrect
            </div> */}
      </div>
    </div>
  );
};

export default Field;
