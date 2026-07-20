import { createGlobalState, reactify } from '@vueuse/core'
import { computed } from 'vue'
import type { WorkingDaysOptions, WorkingDay, Days, Undefineable } from '../types'
import { useRuntimeConfig } from '#imports'

/**
 * This class is responsible for calculating the working days based on the provided options.
 * It will return the working days and their respective working hours based on the options provided.
 * If 'Weekdays' is selected, it will return Monday to Friday as working days.
 * If 'Weekends' is selected, it will return Saturday and Sunday as working days.
 * If 'Custom' is selected, it will return the custom days provided in the options.
 */
class WorkingDays {
  private options: WorkingDaysOptions
  private days: Days[]
  private workingDays: Days[]
  private weekends: Days[]

  constructor(options: Undefineable<WorkingDaysOptions>) {
    this.options = options || { only: 'Weekdays' }
    this.days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
    this.workingDays = this.days.filter((day) => {
      return day !== 'Saturday' && day !== 'Sunday'
    })
    this.weekends = this.days.filter((day) => {
      return day === 'Saturday' || day === 'Sunday'
    })
  }

  get workingDaysList(): WorkingDay[] {
    switch (this.options.only) {
      case 'Weekdays':
        return this.getWeekdays()
      case 'Weekends':
        return this.getWeekends()
      case 'Custom':
        return this.options.customDays || []
      default:
        return []
    }
  }

  getWeekends(): WorkingDay[] {
    if (this.options.only === 'Weekends') {
      return this.weekends.map(day => ({
        day,
        startTime: this.options.startTime,
        endTime: this.options.endTime
      }))
    } else {
      return []
    }
  }

  getWeekdays(): WorkingDay[] {
    return this.workingDays.map(day => ({
      day,
      startTime: this.options.startTime,
      endTime: this.options.endTime
    }))
  }
}

export const useWorkingDaysComposable = createGlobalState(() => {
  const options = useRuntimeConfig().public.businessDetails.workingDays
  const instance = new WorkingDays(options)

  const workingDays = computed(() => instance.workingDaysList)
  const days = computed(() => workingDays.value.map(item => item.day))

  function _getDay(day: Days): WorkingDay | undefined {
    return workingDays.value.find(item => item.day === day)
  }

  const getDay = reactify(_getDay)

  return {
    /**
     * The working days and their respective working hours based on the options provided.
     * * If 'Weekdays' is selected, it will return Monday to Friday as working days.
     * * If 'Weekends' is selected, it will return Saturday and Sunday as working days.
     * * If 'Custom' is selected, it will return the custom days provided in the options.
     */
    workingDays,
    /**
     * The days of the week that are considered working days based on the options provided.
     * * If 'Weekdays' is selected, it will return Monday to Friday as working days.
     * * If 'Weekends' is selected, it will return Saturday and Sunday as working days.
     * * If 'Custom' is selected, it will return the custom days provided in the options.
     */
    days,
    /**
     * Returns the working day object for the specified day of the week.
     * @param day The day of the week to retrieve the working day object for.
     */
    getDay
  }
})
