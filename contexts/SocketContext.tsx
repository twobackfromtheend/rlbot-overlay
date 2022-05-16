import { io, Socket } from "socket.io-client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

const SocketContext = createContext<Socket | null | undefined>(undefined);

export const SocketContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [socket, setSocket] = useState<Socket<any, never> | null>(null);
  const router = useRouter();
  const port = router.query.port || "8000";
  useEffect(() => {
    const socket = io(`http://localhost:${port}`);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [port]);

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
