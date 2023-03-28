# Hashconnect-Provider

This package provides a react context for connecting to HashConnect easily.

### **Install**

`npm install hashconnect-provider`

<br>

### **Setup**

wrap your app in `HashConnectProvider`

```javascript
import { HashConnect } from "hashconnect";
import HashConnectProvider from 'hashconnect-provider'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <HashConnectProvider hashConnect={new Hashconnect(true)} network="testnet" metaData={{
            name: "dApp Example",
            description: "An example hedera dApp",
            icon: "https://www.hashpack.app/img/logo.svg",
            url: "http://localhost:3000"
        }}
    >
        <Component {...pageProps} />
      </HashConnectProvider>
  </>

}
```


### **Usage**

```javascript
    const { 
        hcData, // hashConnect data state
        hashConnect, // hashConnect instance
        topic, //  topic state
        setTopic,
        pairingString, 
        pairingData,
        availableExtension,
        state, // state of the connection
        connectToExtension,
        clearPairings,
        disconnect,
        sendTransaction
    } = useHashConnectContext();
```