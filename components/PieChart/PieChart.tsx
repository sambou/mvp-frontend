// https://heyoka.medium.com/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
import { pluck, sum, take } from 'ramda';
import React, { Fragment } from 'react';
import classes from './styles.module.css';
import Card from '../Card/Card';

type Props = {
  data: Array<{ label: string; value: number }>;
};

const colors = ['#a259ff', '#f24e1e', '#ffc107', '#6497b1'];

// constant to convert between percentage and radians
const percentRadian = 15.91549430918954;

function sumValue<T extends { value: number }>(data: Array<T>) {
  return sum(pluck('value', data));
}

export default function PieChart({ data }: Props) {
  const total = sumValue(data);
  const radius = 21;

  return (
    <>
      <Card className={classes.legend}>
        {data.map(({ label }, i) => (
          <div key={i}>
            <span
              // @ts-expect-error
              style={{ '--iconColor': colors[i % data.length] }}
              className={classes.legendIcon}
            >
              {label}
            </span>
          </div>
        ))}
      </Card>
      <div className={classes.pie}>
        <svg style={{ maxWidth: '200px' }} viewBox="0 0 42 42" role="img">
          {data.map(({ value }, i) => {
            const segment = (value / total) * 100;
            const remainder = 100 - segment;
            const offset = (sumValue(take(i, data)) / total) * 100;
            const segmentCenterAngle = (offset + segment * 0.5) / percentRadian;
            const labelX = radius + (radius - 5) * Math.cos(segmentCenterAngle);
            const labelY = radius + (radius - 5) * Math.sin(segmentCenterAngle);

            return (
              <Fragment key={i}>
                <circle
                  cx={radius}
                  cy={radius}
                  r={percentRadian}
                  fill="transparent"
                  stroke={colors[i % data.length]}
                  strokeWidth={10}
                  strokeDasharray={`${segment} ${remainder}`}
                  strokeDashoffset={100 - offset}
                />
                <text x={labelX} y={labelY} className={classes.label}>
                  {new Intl.NumberFormat('en', { style: 'percent' }).format(
                    value / total
                  )}
                </text>
              </Fragment>
            );
          })}
        </svg>
      </div>
    </>
  );
}
