import { useOnClickOutside } from '../../hooks/useOnOutsideClick';
import clsx from 'clsx';
import { equals } from 'ramda';
import { useRef, useState } from 'react';
import classes from './styles.module.css';
import ArrowDown from '/public/arrow-down.svg';

type Props<T> = {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange?: (value: T) => void;
};

export default function Dropdown<T>({ value, options, onChange }: Props<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className={clsx(classes.wrapper, { [classes.open]: open })}>
      <div>
        <button
          className={clsx(classes.buttonReset, classes.button)}
          onClick={() => setOpen(!open)}
        >
          {options.find((option) => equals(option.value, value))?.label}
          <ArrowDown width={12} />
        </button>
      </div>
      {open && (
        <div className={classes.content} ref={ref}>
          <ul>
            {options.map((option, i) => (
              <li
                data-testid={`dropdown-${option.value}`}
                key={i}
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
