import clsx from 'clsx';
import classes from './styles.module.css';
import { PropsWithChildren, ReactNode, useState } from 'react';

type Props = { content: ReactNode } & PropsWithChildren;

export default function ExpandableRow({ children, content }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={classes.row} onClick={() => setOpen(!open)}>
        {children}
      </div>
      {open && content}
    </>
  );
}
