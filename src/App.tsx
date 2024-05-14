import "./App.css";
import { TopbarDarkBox } from "./components/custom/TopbarDarkBox";

import { useState } from "react";

import { format } from "date-fns";

import { StockData } from "./dev/types/stockData";
import toast from "react-hot-toast";

import { DatePicker } from "./components/custom/Datepicker";
import { Loader2 } from "lucide-react";

function App() {
  const [date, setDate] = useState<Date>();
  const [stocks, setStocks] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    const formatedDate = format(date, "d-MMMM-yyyy");
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${formatedDate}`)
      .then((response) => response.json())
      .then((res) => {
        setStocks(res.data[0]);
      })
      .catch(() => {
        toast.error(`Something went wrong`);
      });
    setLoading(false);
  };
  return (
    <main className="main_section">
      <div className="stockdata_topbar">
        <div className="topbar_center">
          <TopbarDarkBox />
          <h2>stock data</h2>
        </div>
      </div>
      <div className="w-full h-full bg-[#f8fafa] pt-28 flex flex-col items-center">
        <div className="flex gap-2 h-12">
          <DatePicker date={date} setDate={setDate} />
          <button
            onClick={handleSearchClick}
            className="h-full w-24 flex items-center justify-center font-semibold shadow-md text-white rounded-sm "
            style={{ background: "var(--foregroundColor)" }}
          >
            Search
          </button>
        </div>
        <div className="w-full mt-10 flex justify-center">
          {stocks ? (
            <>
              <ul className="list-disc">
                <li>Open :{stocks?.open}</li>
                <li>Close :{stocks?.close}</li>
                <li>High :{stocks?.high}</li>
                <li>Low :{stocks?.low}</li>
              </ul>
            </>
          ) : (
            <>
              {loading ? (
                <>
                  <div className="">
                    <Loader2 className="animate-spin  w-50" />
                  </div>
                </>
              ) : (
                "No Result"
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
