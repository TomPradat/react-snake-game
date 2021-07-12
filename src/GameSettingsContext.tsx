import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import colors from "tailwindcss/colors";

const mobileSettings = {
  board: {
    tileSize: 30,
    numberOfRows: 18,
    numberOfColumns: 10,
    primaryColor: colors.blue[500],
    secondaryColor: colors.blue[400],
    speed: 600 / 3,
  },
  snake: {
    color: colors.green[900],
  },
  fruit: {
    color: colors.yellow[400],
  },
};

const desktopSettings = {
  board: {
    tileSize: 35,
    numberOfRows: 18,
    numberOfColumns: 18,
    primaryColor: colors.blue[500],
    secondaryColor: colors.blue[400],
    speed: 400 / 3,
  },
  snake: {
    color: colors.green[900],
  },
  fruit: {
    color: colors.yellow[400],
  },
};

const GameSettingsContext = React.createContext<{
  board: {
    tileSize: number;
    numberOfRows: number;
    numberOfColumns: number;
    primaryColor: string;
    secondaryColor: string;
    speed: number;
  };
  snake: {
    color: string;
  };
  fruit: {
    color: string;
  };
}>(mobileSettings);

const SettingsProvider = ({ children }: { children: React.ReactElement }) => {
  const [settings, setSettings] = React.useState(mobileSettings);

  const isMobile = useMediaQuery({ query: "(max-width: 750px)" });

  useEffect(() => {
    setSettings(isMobile ? mobileSettings : desktopSettings);
  }, [isMobile]);

  return (
    <GameSettingsContext.Provider value={settings}>
      {children}
    </GameSettingsContext.Provider>
  );
};

const useSettings = () => React.useContext(GameSettingsContext);

export { useSettings, SettingsProvider };
