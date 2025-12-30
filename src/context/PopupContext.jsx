import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const openPopup = (type, data = null) => {
    setPopupType(type);
    setPopupData(data);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupType(null);
    setPopupData(null);
  };

  return (
    <PopupContext.Provider
      value={{
        showPopup,
        popupType,
        popupData,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
