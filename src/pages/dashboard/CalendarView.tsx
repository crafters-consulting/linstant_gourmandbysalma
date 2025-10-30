import {
    addDays,
    endOfMonth,
    endOfWeek,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
} from "date-fns"
import { useEffect, useMemo, useState } from "react"
import type { Sale } from "../../hooks"
import { CalendarDay } from "./CalendarDay.tsx"
import { DaySalesDetails } from "./DaySalesDetails.tsx"

type CalendarDayData = {
    date: Date
    sales: Sale[]
    isToday: boolean
    isCurrentMonth: boolean
}

type CalendarWeek = CalendarDayData[]

function generateCalendarMonth(
    currentMonth: Date,
    sales: Sale[] | undefined
): CalendarWeek[] {
    const firstDay = startOfMonth(currentMonth)
    const lastDay = endOfMonth(firstDay)
    const startDate = startOfWeek(firstDay, { weekStartsOn: 1 }) // Lundi
    const endDate = endOfWeek(lastDay, { weekStartsOn: 1 })

    const days: CalendarDayData[] = []
    let currentDate = startDate

    while (currentDate <= endDate) {
        const dayDate = currentDate
        const daySales =
            sales?.filter((sale) =>
                isSameDay(new Date(sale.deliveryDateTime), dayDate)
            ) || []

        days.push({
            date: dayDate,
            sales: daySales,
            isToday: isSameDay(dayDate, new Date()),
            isCurrentMonth: isSameMonth(dayDate, firstDay),
        })

        currentDate = addDays(currentDate, 1)
    }

    // Grouper par semaines (7 jours)
    const weeks: CalendarWeek[] = []
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7))
    }

    return weeks
}

type CalendarViewProps = {
    sales: Sale[] | null | undefined
    currentMonth: Date
}

export const CalendarView = ({ sales, currentMonth }: CalendarViewProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>()
    const selectedDateSales = useMemo(() => {
        if (!sales || !selectedDate) return []
        return sales.filter((sale) =>
            isSameDay(new Date(sale.deliveryDateTime), selectedDate)
        )
    }, [sales, selectedDate])

    const weeks = useMemo(
        () => generateCalendarMonth(currentMonth, sales),
        [currentMonth, sales]
    )

    useEffect(() => {
        if (selectedDate && selectedDateSales.length > 0) {
        }
    }, [selectedDate, selectedDateSales])

    const handleDayClick = (date: Date) => {
        setSelectedDate(date)
        document.getElementById("daySalesDetailsModal")?.showModal()
    }

    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Jours de la semaine */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                            (day) => (
                                <div
                                    key={day}
                                    className="text-center text-xs font-semibold text-base-content/70 p-2"
                                >
                                    {day}
                                </div>
                            )
                        )}
                    </div>

                    {/* Grille du calendrier */}
                    <div className="grid gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div
                                key={`week-${weekIndex.toString()}`}
                                className="grid grid-cols-7 gap-1"
                            >
                                {week.map((day, dayIndex) => (
                                    <CalendarDay
                                        key={`day-${weekIndex.toString()}-${dayIndex.toString()}`}
                                        {...day}
                                        onClick={() => handleDayClick(day.date)}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal avec détails des commandes */}
            <DaySalesDetails
                id="daySalesDetailsModal"
                date={selectedDate}
                sales={selectedDateSales}
            />
        </>
    )
}
