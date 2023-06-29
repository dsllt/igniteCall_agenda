import { Calendar } from '@/components/Calendar'
import {
  CalendarStepContainer,
  TimePicker,
  TimePickerButton,
  TimePickerHeader,
  TimePickerList,
} from './styles'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState(null)

  const router = useRouter()
  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        console.log(response.data)
      })
  }, [selectedDate, username])

  return (
    <CalendarStepContainer isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />
      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
            <TimePickerButton>12:00h</TimePickerButton>
          </TimePickerList>
        </TimePicker>
      )}
    </CalendarStepContainer>
  )
}
