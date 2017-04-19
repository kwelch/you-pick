import React from 'react';

export default class Wheel extends React.Component {
  render() {
    const { slices } = this.props;
    const size = 300;
    // not sure why but this makes it fill the entire circle
    const MAGIC_DASHARRAY_NUMBER = 471.5 * 2;
    const total = slices.reduce((acc = 0, curr) => acc + curr.size, 0);
    let currentStart = 0;
    return (
      <svg
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
        }}
      >
        {slices.map(s => {
          const radius = size / 2;
          const percent = s.size / total * MAGIC_DASHARRAY_NUMBER;
          const dashArray = `0,${currentStart},${percent},${MAGIC_DASHARRAY_NUMBER}`;
          currentStart += percent;

          return (
            <circle
              key={s.name}
              r={radius}
              cx={radius}
              cy={radius}
              style={{
                fill: 'none',
                stroke: s.color,
                strokeWidth: size,
                strokeDasharray: dashArray,
              }}
            />
          );
        })}
      </svg>
    );
  }
}
