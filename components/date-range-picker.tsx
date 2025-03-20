// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import {
//   addDays,
//   endOfMonth,
//   format,
//   startOfMonth,
//   subDays,
//   subMonths,
// } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import * as React from "react";
// import { useState } from "react";
// import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export function DateRangePicker({
  className,
  filters,
  setFilters,
}: React.HTMLAttributes<HTMLDivElement> & {
  filters: any;
  setFilters: (filters: any) => void;
}) {
  // Create a state that matches the format required by the Calendar component
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: filters.period?.startDate || undefined,
    to: filters.period?.endDate || undefined,
  });

  // Today's date
  const today = new Date();

  // Create date range presets
  const presets = [
    {
      label: "Today",
      days: 0,
      getDate: () => ({
        from: today,
        to: today,
      }),
    },
    {
      label: "Yesterday",
      days: 1,
      getDate: () => {
        const yesterday = subDays(today, 1);
        return {
          from: yesterday,
          to: yesterday,
        };
      },
    },
    {
      label: "Last 7 days",
      days: 7,
      getDate: () => ({
        from: subDays(today, 7),
        to: today,
      }),
    },
    {
      label: "Last 30 days",
      days: 30,
      getDate: () => ({
        from: subDays(today, 30),
        to: today,
      }),
    },
    {
      label: "This month",
      days: 0,
      getDate: () => ({
        from: startOfMonth(today),
        to: today,
      }),
    },
    {
      label: "Last month",
      days: 0,
      getDate: () => ({
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      }),
    },
    {
      label: "All time",
      days: 0,
      getDate: () => ({
        from: undefined,
        to: undefined,
      }),
    },
  ];

  // Function to update the parent component's filters
  const updateFilters = (range: DateRange | undefined) => {
    setFilters({
      ...filters,
      period: {
        startDate: range?.from,
        endDate: range?.to,
      },
    });
  };

  // Function to handle date selection
  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    updateFilters(range);
  };

  // Function to apply a preset
  const applyPreset = (preset: (typeof presets)[0]) => {
    const range = preset.getDate();
    setDateRange(range);
    updateFilters(range);
  };

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !dateRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>All time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex border-b">
            <div className="border-r p-2 space-y-2 w-36">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm font-normal"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Calendar on the right */}
            <div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from || today}
                selected={dateRange}
                onSelect={handleSelect}
                numberOfMonths={2}
              />
            </div>
          </div>

          {/* Action buttons */}
          {/* <div className="flex items-center justify-end gap-2 p-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDateRange(undefined);
                updateFilters(undefined);
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => {
                // This is to close the popover
                // The actual data is already updated in the handleSelect function
              }}
            >
              Apply
            </Button>
          </div> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ###########################################################################

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
