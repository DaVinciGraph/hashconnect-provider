"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHashConnectContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var types_1 = require("hashconnect/dist/types");
var hashconnect_1 = require("hashconnect/dist/hashconnect");
var HashConnectContext = React.createContext({
    hcData: {},
    topic: '',
    setTopic: function () { },
    pairingString: "",
    pairingData: null,
    availableExtension: null,
    hashconnect: null,
    state: types_1.HashConnectConnectionState.Disconnected,
    sendTransaction: function () { },
    connectToExtension: function () { },
    clearPairings: function () { },
    disconnect: function () { }
});
var hashconnect = new hashconnect_1.HashConnect(false);
function HashConnectProvider(_a) {
    var _this = this;
    var children = _a.children, _b = _a.metaData, metaData = _b === void 0 ? {
        name: "dApp Example",
        description: "An example hedera dApp",
        icon: "https://www.hashpack.app/img/logo.svg",
        url: "http://localhost:3000"
    } : _b, _c = _a.network, network = _c === void 0 ? 'testnet' : _c;
    var _d = React.useState(hashconnect.hcData), hcData = _d[0], setHcData = _d[1];
    var _e = React.useState(''), topic = _e[0], setTopic = _e[1];
    var _f = React.useState(""), pairingString = _f[0], setPairingString = _f[1];
    var _g = React.useState(null), pairingData = _g[0], setPairingData = _g[1];
    var _h = React.useState({
        name: "",
        description: "",
        icon: ""
    }), availableExtension = _h[0], setAvailableExtension = _h[1];
    var appMetadata = metaData;
    var _j = React.useState(types_1.HashConnectConnectionState.Disconnected), state = _j[0], setState = _j[1];
    React.useEffect(function () {
        init();
    }, []);
    hashconnect.connectionStatusChangeEvent.on(function (data) {
        setState(data);
        setHcData(hashconnect.hcData);
    });
    var init = function () { return __awaiter(_this, void 0, void 0, function () {
        var initData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUpHashConnectEvents();
                    return [4 /*yield*/, hashconnect.init(appMetadata, network, false)];
                case 1:
                    initData = _a.sent();
                    setTopic(initData.topic);
                    setPairingString(initData.pairingString);
                    setPairingData(initData.savedPairings[0]);
                    return [2 /*return*/];
            }
        });
    }); };
    var setUpHashConnectEvents = function () {
        hashconnect.foundExtensionEvent.on(function (data) {
            setAvailableExtension(data);
        });
        hashconnect.pairingEvent.on(function (data) {
            setPairingData(data.pairingData);
        });
        hashconnect.connectionStatusChangeEvent.on(function (state) {
            setState(state);
        });
    };
    var connectToExtension = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            hashconnect.connectToLocalWallet();
            return [2 /*return*/];
        });
    }); };
    var sendTransaction = function (trans, acctToSign, return_trans, hideNfts) {
        if (return_trans === void 0) { return_trans = false; }
        if (hideNfts === void 0) { hideNfts = false; }
        return __awaiter(_this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transaction = {
                            topic: topic,
                            byteArray: trans,
                            metadata: {
                                accountToSign: acctToSign,
                                returnTransaction: return_trans,
                                hideNft: hideNfts
                            }
                        };
                        return [4 /*yield*/, hashconnect.sendTransaction(topic, transaction)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var requestAccountInfo = function () { return __awaiter(_this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request = {
                        topic: topic,
                        network: network,
                        multiAccount: true
                    };
                    return [4 /*yield*/, hashconnect.requestAdditionalAccounts(topic, request)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var disconnect = function () {
        hashconnect.disconnect(pairingData.topic);
        setPairingData(null);
    };
    var clearPairings = function () {
        hashconnect.clearConnectionsAndData();
        setPairingData(null);
    };
    return (0, jsx_runtime_1.jsx)(HashConnectContext.Provider, __assign({ value: {
            hcData: hcData,
            hashconnect: hashconnect,
            topic: topic,
            setTopic: setTopic,
            pairingString: pairingString,
            pairingData: pairingData,
            availableExtension: availableExtension,
            state: state,
            connectToExtension: connectToExtension,
            clearPairings: clearPairings,
            disconnect: disconnect,
            sendTransaction: sendTransaction
        } }, { children: children }));
}
exports.default = HashConnectProvider;
function useHashConnectContext() {
    return React.useContext(HashConnectContext);
}
exports.useHashConnectContext = useHashConnectContext;
