import { useState } from "react";
import { YearContext } from "./yearContext";

export default function YearProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(2026);
  return (
    <YearContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </YearContext.Provider>
  );
}
