'use client'

import { monthsArray } from '@/utils/monthsArray'

export function SelectStartDate() {
  const date = new Date()

  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()

  const startYear = currentYear - 1
  const endYear = currentYear + 6

  const yearsOptions = []

  for (let year = startYear; year <= endYear; year++) {
    yearsOptions.push(year)
  }

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-center">
      <label htmlFor="recurrency" className="md:w-40">
        A partir de:
      </label>
      <div className="relative flex flex-1 space-x-2">
        <select
          name="startMonth"
          id="startMonth"
          className={`flex-1 rounded p-2 shadow`}
          defaultValue={currentMonth}
        >
          {monthsArray.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="startYear"
          id="startYear"
          className={`flex-1 rounded p-2 shadow`}
          defaultValue={currentYear}
        >
          {yearsOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
