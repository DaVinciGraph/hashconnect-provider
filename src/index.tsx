import * as React from "react";
import { HashConnectConnectionState, HashConnectTypes } from "hashconnect/dist/types";
import { HashConnect } from "hashconnect";
import { MessageTypes } from "hashconnect/dist/message";
import { IHashConnect } from "hashconnect/dist/esm/types";

export type HederaNetworkType = 'testnet' | 'mainnet' | 'previewnet';

export type HashConnectContent = {
    hcData: IHashConnect["hcData"],
    topic: string,
    setTopic: React.Dispatch<React.SetStateAction<string>>,
    clearPairings: Function,
    pairingString: string,
    pairingData: HashConnectTypes.SavedPairingData | null,
    availableExtension: HashConnectTypes.WalletMetadata | null,
    state: HashConnectConnectionState,
    hashConnect: HashConnect | null
    connectToExtension: Function,
    disconnect: Function,
    sendTransaction: (trans: Uint8Array, acctToSign: string, return_trans: boolean, hideNfts: boolean) => Promise<MessageTypes.TransactionResponse>,
    hederaNetwork: HederaNetworkType,
    setHederaNetwork: React.Dispatch<React.SetStateAction<string>>
}

const HashConnectContext = React.createContext<HashConnectContent>({} as HashConnectContent);

export interface IHashconnectProviderProps {
    hashConnect: HashConnect,
    metaData?: HashConnectTypes.AppMetadata,
    network?: HederaNetworkType,
    children: React.ReactNode
}

export function HashConnectProvider({ children, hashConnect, metaData, network = 'testnet' }: IHashconnectProviderProps) {

    const [hcData, setHcData] = React.useState<object>(hashConnect.hcData);
    const [topic, setTopic] = React.useState('');
    const [pairingString, setPairingString] = React.useState("");
    const [pairingData, setPairingData] = React.useState<HashConnectTypes.SavedPairingData | null>(null);
    const [availableExtension, setAvailableExtension] = React.useState<HashConnectTypes.WalletMetadata>({
        name: "",
        description: "",
        icon: ""
    });
    const appMetadata: HashConnectTypes.AppMetadata = metaData!;

    const [state, setState] = React.useState(HashConnectConnectionState.Disconnected);
    const [hederaNetwork, setHederaNetwork] = React.useState<HederaNetworkType>(isValidNetwork(localStorage.getItem('hederaNetwork') as HederaNetworkType) ? localStorage.getItem('hederaNetwork') as HederaNetworkType : network);

    React.useEffect(() => {
        init();
    }, []);

    React.useEffect(() => {
        if (isValidNetwork(hederaNetwork)) {
            clearPairings()
            localStorage.setItem('hederaNetwork', hederaNetwork!);
        }
    }, [hederaNetwork])

    hashConnect.connectionStatusChangeEvent.on((data: any) => {
        setState(data);
        setHcData(hashConnect.hcData);
    });

    const init = async () => {
        setUpHashConnectEvents();

        let initData = await hashConnect.init(appMetadata, hederaNetwork, false);

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
            network: hederaNetwork,
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
        sendTransaction,
        hederaNetwork,
        setHederaNetwork
    } as HashConnectContent}>
        {children}
    </HashConnectContext.Provider>
}

export function useHashConnectContext() {
    return React.useContext(HashConnectContext);
}

const isValidNetwork = (network: HederaNetworkType): boolean => {
    return network === 'testnet' || network === 'mainnet' || network === 'previewnet';
}