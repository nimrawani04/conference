import { createContext, useContext } from "react";

export const YearContext = createContext({
  selectedYear: 2026,
  setSelectedYear: () => {},
});

export const useYear = () => useContext(YearContext);
