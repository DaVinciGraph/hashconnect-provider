# Hashconnect-Provider

This package provide a react context for connecting to HashConnect easily.

### **Install**

`npm install hashconnect-provider`

<br>

### **Setup**

wrap your app in `HashConnectProvider`

```javascript
import { HashConnect } from "HashConnect/dist/HashConnect";
import HashConnectProvider from 'HashConnect-provider'

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
        hcData, // HashConnect data state
        HashConnect, // HashConnect instance
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