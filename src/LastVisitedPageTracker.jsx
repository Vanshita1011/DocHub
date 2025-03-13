import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LastVisitedPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (!["/signIn", "/signUp"].includes(location.pathname)) {
      localStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location]);

  return null;
};

export default LastVisitedPageTracker;
