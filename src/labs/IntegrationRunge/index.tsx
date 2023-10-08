import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Box, Button, Typography, TextField } from '@mui/material'

import type { SubmitHandler } from 'react-hook-form'

const targetFunction = (x: number) => x*x*x
const integratedTargetFunction = (x: number, c: number = 0) => x*x*x*x/4 + c

const doubleDerivateveTargetFunction = (x: number) => 6*x

type Input = {
  leftBorder: number;
  rightBorder: number;
  h: number;
}

type Result = {

}

export default function Integration() {
  const { handleSubmit, register } = useForm<Input>()
  const [] = useState<number[]>([])

  const onSubmit: SubmitHandler<Input> = (data: Input) => {
    const { leftBorder, rightBorder, h } = data

    const M = Math.max(Math.abs(leftBorder), Math.abs(rightBorder))
    const error = (M / 24) * h * h * (rightBorder - leftBorder) 

  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap="8px" marginBottom="8px">
          <Box display="flex" gap="16px">
            <TextField type="number" label="Left Border" {...register("leftBorder", { valueAsNumber: true })} />
            <TextField type="number" label="Right Border" {...register("rightBorder", { valueAsNumber: true })} />
          </Box>
          <TextField type="number" label="h" {...register("h", { valueAsNumber: true })} />
        </Box>
        <Button type="submit" variant="outlined"> 
          Calculate
        </Button>
      </form>
    </Box>
  )
}