import * as React from "react";
import { HashConnectConnectionState, HashConnectTypes } from "hashconnect/dist/types";
import { HashConnect } from "hashconnect";
import { MessageTypes } from "hashconnect/dist/message";

export type HashConnectContent = {
    hcData: object,
    topic: string,
    setTopic: Function,
    clearPairings: Function,
    pairingString: string,
    pairingData: HashConnectTypes.SavedPairingData | null,
    availableExtension: HashConnectTypes.WalletMetadata | null,
    state: HashConnectConnectionState,
    hashConnect: HashConnect | null
    connectToExtension: Function,
    disconnect: Function,
    sendTransaction: Function
}

const HashConnectContext = React.createContext<HashConnectContent>({} as HashConnectContent);

export interface IHashconnectProviderProps {
    hashConnect: HashConnect,
    metaData?: HashConnectTypes.AppMetadata,
    network?: "testnet" | "mainnet" | "previewnet",
    children: React.ReactNode
}

export function HashConnectProvider({ children, hashConnect, metaData = {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://www.hashpack.app/img/logo.svg",
    url: "http://localhost:3000"
}, network = 'testnet' }: IHashconnectProviderProps) {

    const [hcData, setHcData] = React.useState<object>(hashConnect.hcData);
    const [topic, setTopic] = React.useState('');
    const [pairingString, setPairingString] = React.useState("");
    const [pairingData, setPairingData] = React.useState<HashConnectTypes.SavedPairingData | null>(null);
    const [availableExtension, setAvailableExtension] = React.useState<HashConnectTypes.WalletMetadata>({
        name: "",
        description: "",
        icon: ""
    });
    const appMetadata: HashConnectTypes.AppMetadata = metaData;

    const [state, setState] = React.useState(HashConnectConnectionState.Disconnected);

    React.useEffect(() => {
        init();
    }, []);

    hashConnect.connectionStatusChangeEvent.on((data: any) => {
        setState(data);
        setHcData(hashConnect.hcData);
    });

    const init = async () => {
        setUpHashConnectEvents();

        let initData = await hashConnect.init(appMetadata, network, false);

        setTopic(initData.topic);
        setPairingString(initData.pairingString);

        setPairingData(initData.savedPairings[0]);
    }

    const setUpHashConnectEvents = () => {
        hashConnect.foundExtensionEvent.on((data) => {
            setAvailableExtension(data);
        })

        hashConnect.pairingEvent.on((data) => {
            setPairingData(data.pairingData!);
        });

        hashConnect.connectionStatusChangeEvent.on((state) => {
            setState(state);
        })
    }

    const connectToExtension = async () => {
        hashConnect.connectToLocalWallet();
    }


    const sendTransaction = async (trans: Uint8Array, acctToSign: string, return_trans: boolean = false, hideNfts: boolean = false) => {
        const transaction: MessageTypes.Transaction = {
            topic: topic,
            byteArray: trans,

            metadata: {
                accountToSign: acctToSign,
                returnTransaction: return_trans,
                hideNft: hideNfts
            }
        }

        return await hashConnect.sendTransaction(topic, transaction)
    }

    const requestAccountInfo = async () => {
        let request: MessageTypes.AdditionalAccountRequest = {
            topic: topic,
            network: network,
            multiAccount: true
        }

        await hashConnect.requestAdditionalAccounts(topic, request);
    }

    const disconnect = () => {
        hashConnect.disconnect(pairingData!.topic)
        setPairingData(null);
    }

    const clearPairings = () => {
        hashConnect.clearConnectionsAndData();
        setPairingData(null);
    }

    return <HashConnectContext.Provider value={{
        hcData,
        hashConnect,
        topic,
        setTopic,
        pairingString,
        pairingData,
        availableExtension,
        state,
        connectToExtension,
        clearPairings,
        disconnect,
        sendTransaction
    }}>
        {children}
    </HashConnectContext.Provider>
}

export function useHashConnectContext() {
    return React.useContext(HashConnectContext);
}