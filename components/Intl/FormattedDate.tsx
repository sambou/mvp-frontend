type Props = {
  date: string;
};

export default function FormattedDate(props: Props) {
  const date = new Intl.DateTimeFormat('en').format(new Date(props.date));
  return <span>{date}</span>;
}
