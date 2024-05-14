import { Popover } from "@radix-ui/react-popover";
import "./App.css";
import { TopbarDarkBox } from "./components/custom/TopbarDarkBox";
import { PopoverContent, PopoverTrigger } from "./shadcn/ui/popover";
import { Button } from "./shadcn/ui/button";
import { cn } from "./lib/utils";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { StockData } from "./dev/types/stockData";
import toast from "react-hot-toast";
import { Calendar } from "./components/custom/calander";

function App() {
  const [date, setDate] = useState<Date>();
  const [stocks, setStocks] = useState<StockData[] | null>(null);
  stocks;
  setStocks;
  const handleSearchClick = async () => {
    if (!date) {
      return toast("Please pick a date in input", {
        icon: "↙😡🥴",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    const formatedDate = format(date, "d-MMMM-yyyy");
    alert(formatedDate);
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${formatedDate}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <main className="main_section">
      <div className="stockdata_topbar">
        <div className="topbar_center">
          <TopbarDarkBox />
          <h2>stock data</h2>
        </div>
      </div>
      <div className="w-full bg-[#f8fafa] pt-28 flex justify-center">
        <div className="flex gap-2 h-12">
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
                selected={date}
                onSelect={setDate}
                fromYear={1900}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
          <button
            onClick={handleSearchClick}
            className="h-full w-24 flex items-center justify-center font-semibold shadow-md text-white rounded-sm "
            style={{ background: "var(--foregroundColor)" }}
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
