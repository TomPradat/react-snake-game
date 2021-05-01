import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import colors from "tailwindcss/colors";

const initialSettings = {
  board: {
    tileSize: 20,
    numberOfRows: 18,
    numberOfColumns: 18,
    primaryColor: colors.blue[500],
    secondaryColor: colors.blue[400],
    speed: 300 / 3,
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
}>(initialSettings);

const SettingsProvider = ({ children }: { children: React.ReactElement }) => {
  const [settings, setSettings] = React.useState(initialSettings);

  const isMobile = useMediaQuery({ query: "(max-width: 750px)" });

  useEffect(() => {
    setSettings((old) => ({
      ...old,
      board: {
        ...old.board,
        tileSize: isMobile ? 30 : 50,
        numberOfRows: isMobile ? 18 : 18,
        numberOfColumns: isMobile ? 10 : 18,
        speed: isMobile ? 400 / 3 : 300 / 3,
      },
    }));
  }, [isMobile]);

  return (
    <GameSettingsContext.Provider value={settings}>
      {children}
    </GameSettingsContext.Provider>
  );
};

const useSettings = () => React.useContext(GameSettingsContext);

export { useSettings, SettingsProvider };
