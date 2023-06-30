import React, {
  useState,
  useEffect,
  useContext,
  ReactNode,
  SetStateAction,
} from "react";

type ContextArgs = {
  name: string;
  setName: (value: SetStateAction<string>) => void;
};

const NameContext = React.createContext<null | ContextArgs>(null);

type Props = {
  children: ReactNode;
};

export const NameProvider: React.FC<Props> = ({ children }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("david");
  }, []);

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  const context = useContext(NameContext);
  if (!context) throw new Error("useName must be used within a NameProvider");
  return context;
};

export default NameProvider;
