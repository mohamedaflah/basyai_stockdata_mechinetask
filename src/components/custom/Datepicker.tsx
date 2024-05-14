import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calander";
import React, { SetStateAction } from "react";
import {  SelectSingleEventHandler } from "react-day-picker";

interface ChildProp {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date|undefined>>;
}
export function DatePicker({ date, setDate }: ChildProp) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] shadow-inner bg-[#f3f5f5] h-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span></span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date as Date | undefined}
          onSelect={setDate as SelectSingleEventHandler | undefined}
          fromYear={1900}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
