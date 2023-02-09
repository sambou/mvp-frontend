import classes from './styles.module.css';

type Props = {
  name: string;
};

export default function Avatar({ name }: Props) {
  const initials = parseInitials(name);
  return (
    <div className={classes.wrapper}>
      <div className={classes.box}>{initials}</div>
      <div className={classes.name}>{name}</div>
    </div>
  );
}

function parseInitials(name: string) {
  return name
    .match(/\b(\w)/g)
    ?.join('')
    .substring(0, 2);
}
