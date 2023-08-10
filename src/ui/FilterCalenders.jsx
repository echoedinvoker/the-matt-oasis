import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";


function FilterCalender() {
  const [searchParams, setSearchParams] = useSearchParams()

  const start = searchParams.get('start') || new Date().toISOString().split('T')[0]
  const end = searchParams.get('end') || new Date().toISOString().split('T')[0]

  function handleStart(e) {
    searchParams.set('start', e.target.value)
    setSearchParams(searchParams)
  }
  function handleEnd(e) {
    searchParams.set('end', e.target.value)
    setSearchParams(searchParams)
  }

  return (
  <div>
      <input type="date" name="start" value={start} onChange={handleStart} />
      <input type="date" name="end" value={end} onChange={handleEnd} />
  </div>
  )
}

export default FilterCalender
