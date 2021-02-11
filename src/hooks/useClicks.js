import { useEffect, useState, useCallback } from "react";
import { addEntry, getNumberOfClicks } from "../firebase/index";

export const useClicks = () => {
  const [clicks, setClicks] = useState("");

  const fetchMyAPI = useCallback(async () => {
    let response = await getNumberOfClicks();
    setClicks(response.numberOfClicks);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);
  return [clicks, setClicks];
};
