import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

export function SolanaWallet({mnemonic}){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [walletKeys, setWalletKeys] = useState([]);
    useEffect(() =>{
        console.log(mnemonic);
    },[mnemonic])
    async function generateWallet(){
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path,seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setWalletKeys([...walletKeys,{secret:bs58.encode(secret),public:keypair.publicKey}])
    }
    return <div>
        <button onClick={generateWallet}>Add SOL Wallet</button>
        {walletKeys.map(w => <div key={w.secret}>
            <p>Public Key:{w.public.toBase58()}</p>
            <p>Secret Key:{w.secret}</p>
        </div>)}
    </div>
}