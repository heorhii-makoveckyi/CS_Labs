import React, { useState } from 'react';
import calculateLagrangePolynomial from './math';
import { useForm } from "react-hook-form"
import { Box, Button, TextField, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';

import type { SubmitHandler } from "react-hook-form"
import type { Point } from "./math";

type Input = {
  N: number;
  leftBorder: number;
  rightBorder: number;
  x: number;
}

type CompareChartDots = {
  x: number[];
  targetY: number[];
  interpolatedY: number[];
}

type Result = {
  valueInXDot: number;
  compareChartDots: CompareChartDots
}

const targetFunction = (x: number) => Math.cos(x) * (x*x*x - x);

export default function LagrangePolynomial() {
  const { register, handleSubmit, getValues } = useForm<Input>();
  const [result, setResult] = useState<Result>();

  const x = getValues("x");
  const targetValue = targetFunction(x);
  const absError = (result?.valueInXDot || targetValue) - targetValue;
  const relError = absError / targetValue;

  const onSubmit: SubmitHandler<Input> = (data: Input) => {
    const { N, leftBorder, rightBorder, x } = data;
    
    const step = (rightBorder - leftBorder) / N;
    const pointsForInterpolation: Point[] = [];
    for (let i = 0; i <= N; i++) {
      const X = leftBorder + step * i;
      const Y = targetFunction(X);
      pointsForInterpolation.push({ x: X, y: Y });
    }

    const countOfDotsToCompare = N * 5
    const compareStep = (rightBorder - leftBorder) / countOfDotsToCompare;
    const compareChartDots: CompareChartDots = { x: [], targetY: [], interpolatedY: [] }

    for (let i = 0; i <= countOfDotsToCompare; i++) {
      const X = leftBorder + compareStep * i;
      const targetY = targetFunction(X);
      const interpolatedY = calculateLagrangePolynomial(X, pointsForInterpolation);

      compareChartDots.x.push(X);
      compareChartDots.targetY.push(targetY);
      compareChartDots.interpolatedY.push(interpolatedY);
    }

    setResult({
      valueInXDot: calculateLagrangePolynomial(x, pointsForInterpolation), 
      compareChartDots,
    });
  }

  return (
    <Box margin="auto" marginTop="32px" width="50%" gap="32px">
      <Typography variant="subtitle1" marginBottom="32px">
        Target function: {String(targetFunction)}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="8px" marginBottom="8px">
          <Box display="flex" gap="16px">
            <TextField type="number" label="Left Border" {...register("leftBorder", { valueAsNumber: true })} />
            <TextField type="number" label="Right Border" {...register("rightBorder", { valueAsNumber: true })} />
          </Box>
          <Box display="flex" gap="16px">
            <TextField type="number" label="X₀" {...register("x", { valueAsNumber: true })} />
            <TextField type="number" label="N" {...register("N", { valueAsNumber: true })} />
          </Box>
        </Box>
        <Button type="submit" variant="outlined"> 
          Calculate
        </Button>
      </form>
      <Box display="flex" flexDirection="column" gap="8px" marginTop="16px">
        <Typography>
          Polinomial: Y(X₀) = {result?.valueInXDot}
        </Typography>
        <Typography>
          Target: Y(X₀) = {targetValue}
        </Typography>
        <Typography color="red">
          Absolute error: {absError}
        </Typography>
        <Typography color="red">
          Relative error: Y(X₀) = {relError}
        </Typography>
      </Box>
      {result?.compareChartDots.x.length && (
        <LineChart
          xAxis={[{ data: result.compareChartDots.x }]}
          series={[
            {
              data: result.compareChartDots.targetY,
              color: 'red',
              label: 'Target',
            },
            {
              data: result.compareChartDots.interpolatedY,
              color: 'blue',
              label: 'Interpolated',
            }
          ]}
          width={800}
          height={600}
        />
      )}
    </Box>
  );
}