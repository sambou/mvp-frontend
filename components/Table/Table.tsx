import clsx from 'clsx';
import classes from './styles.module.css';
import { ReactNode } from 'react';
import { WithClassName } from '../types';

type Props = {
  header: Array<ReactNode>;
  body: Array<Array<ReactNode>>;
} & WithClassName;

export default function Table({ header, body, className }: Props) {
  return (
    <table className={clsx(classes.table, className)}>
      <thead>
        <tr>
          {header.map((cell, i) => (
            <th key={i}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, i) => (
          <tr key={i}>
            {row.map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
