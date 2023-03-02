# Hashconnect-Provider

This package provide a react context for connecting to hashconnect easily.

### **Install**

`npm install hashconnect-provider`

<br>

### **Setup**

wrap your app in `HashConnectProvider`

```javascript
import HashConnectProvider from 'hashconnect-provider'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <HashConnectProvider network="testnet" metaData={{
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
        hcData, // hashconnect data state
        hashconnect, // hashconnect instance
        topic, //  topic state
        setTopic,
        pairingString, 
        pairingData,
        availableExtension,
        state, // state of connection
        connectToExtension,
        clearPairings,
        disconnect,
        sendTransaction
    } = useHashConnectContext();
```