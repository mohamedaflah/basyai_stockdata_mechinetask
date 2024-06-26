import "./App.css";
import { TopbarDarkBox } from "./components/custom/TopbarDarkBox";

import { useRef, useState } from "react";

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
    const formatedDate = format(date, "d-MMMM-yyyy");
    if(stocks&&stocks.date==formatedDate){
      return toast("Data already is there", {
        icon: "↙",
        style: {
          borderRadius: "20px",
          background: "#3e464dcf",
          color: "#fff",
        },
      }); 
    }
    setLoading(true);
    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${formatedDate}`)
      .then((response) => response.json())
      .then((res) => {
        setStocks(res.data[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error(`Something went wrong`);
      });
  };
  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <main className="main_section" ref={mainRef}>
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
            className="h-full w-24 flex items-center justify-center font-semibold shadow-md shadow-green-300 text-white rounded-sm "
            style={{ background: "var(--foregroundColor)" }}
          >
            Search
          </button>
        </div>
        <div className="w-full mt-10 flex gap-2 justify-center">
          {loading && (
            <>
              <div className="">
                <Loader2 className="animate-spin  w-50" />
              </div>
            </>
          )}
          {stocks ? (
            <>
              <ul className="list-disc" data-testid="stock-data">
                <li>Open :{stocks?.open}</li>
                <li>Close :{stocks?.close}</li>
                <li>High :{stocks?.high}</li>
                <li>Low :{stocks?.low}</li>
              </ul>
            </>
          ) : (
            <>
              {!loading && <div data-testid="no-result">No Results Found</div>}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
