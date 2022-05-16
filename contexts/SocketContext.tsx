import { io, Socket } from "socket.io-client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const SocketContext = createContext<Socket | null | undefined>(undefined);

export const SocketContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [socket, setSocket] = useState<Socket<any, never> | null>(null);
  useEffect(() => {
    const socket = io("localhost:8000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};
