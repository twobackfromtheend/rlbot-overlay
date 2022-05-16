import dynamic from "next/dynamic";

const Debug = dynamic(() => import("./DebugComponent"), { ssr: false });

export default Debug;
