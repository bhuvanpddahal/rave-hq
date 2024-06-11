import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { eachDayOfInterval, isSameDay } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function fillMissingDays(
    chartData: {
        date: Date,
        overallRating: number,
        count: number
    }[],
    startDate: Date,
    endDate: Date
) {
    const allDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    let prevOverallRating = 0;

    const dataPerDay = allDays.map((day) => {
        const found = chartData.find((d) => isSameDay(d.date, day));

        if (found) {
            prevOverallRating = found.overallRating;
            return found;
        } else {
            return {
                date: day,
                overallRating: prevOverallRating,
                count: 0
            };
        }
    });

    return dataPerDay;
}

export function fillMissingDaysForDashboard(
    chartData: {
        date: Date,
        value: number
    }[],
    startDate: Date,
    endDate: Date
) {
    const allDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    let prevValue = 0;

    const dataPerDay = allDays.map((day) => {
        const found = chartData.find((d) => isSameDay(d.date, day));

        if (found) {
            prevValue = found.value;
            return found;
        } else {
            return {
                date: day,
                value: prevValue
            };
        }
    });

    return dataPerDay;
}