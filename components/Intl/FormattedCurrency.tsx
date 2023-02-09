type Props = {
  amount: number;
};

export default function FormattedCurrency(props: Props) {
  const amount = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(props.amount);

  return <>{amount}</>;
}
