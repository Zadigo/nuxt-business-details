import { describe, it, expect } from 'vitest'
import { isRef, toValue } from 'vue'
import { useWorkingDaysComposable } from  '../src/runtime/composables'

describe.todo('Tests for useWorkingDaysComposable', () => {
  it('should return correct working days for Weekdays option', () => {
    const { workingDays } = useWorkingDaysComposable()

    expect(workingDays).toBeDefined()
    expect(isRef(workingDays)).toBe(true)
    console.log(toValue(workingDays))
    expect(Array.isArray(toValue(workingDays))).toBe(true)

    toValue(workingDays).forEach(day => {
      expect(day).toHaveProperty('day')
      expect(day).toHaveProperty('startTime')
      expect(day).toHaveProperty('endTime')
    })
  })

  it('should return correct working days for Weekdays option', () => {
    const { days } = useWorkingDaysComposable()

    expect(days).toBeDefined()
    expect(isRef(days)).toBe(true)
    expect(Array.isArray(toValue(days))).toBe(true)
    expect(toValue(days)).toEqual([ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ])
  })

  it('should be able to get a working day', () => {
    const { getDay } = useWorkingDaysComposable()

    expect(getDay).toBeDefined()
    expect(typeof getDay).toBe('function')

    const day = getDay('Monday')
    expect(day).toBeDefined()
    expect(isRef(day)).toBe(true)
    expect(toValue(day)).toHaveProperty('day', 'Monday')
    expect(toValue(day)).toHaveProperty('startTime', '09:00')
    expect(toValue(day)).toHaveProperty('endTime', '17:00')
  })
})
