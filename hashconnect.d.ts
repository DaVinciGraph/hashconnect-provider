import * as React from "react";
import { HashConnectConnectionState, HashConnectTypes } from "hashconnect/dist/types";
import { HashConnect } from "hashconnect/dist/hashconnect";
export declare type HashConnectContent = {
    hcData: object;
    topic: string;
    setTopic: Function;
    clearPairings: Function;
    pairingString: string;
    pairingData: HashConnectTypes.SavedPairingData | null;
    availableExtension: HashConnectTypes.WalletMetadata | null;
    state: HashConnectConnectionState;
    hashconnect: HashConnect | null;
    connectToExtension: Function;
    disconnect: Function;
    sendTransaction: Function;
};
export default function HashConnectProvider({ children, metaData, network }: React.PropsWithChildren): any;
export declare function useHashConnectContext(): any;
