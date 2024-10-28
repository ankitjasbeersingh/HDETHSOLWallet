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
        setWalletKeys([...walletKeys,{private:bs58.encode(secret),public:keypair.publicKey}])
    }
    return <div className="mt-12">
        <div className="border border-[light-grey] border-solid rounded-2xl">
        <h1>Sol</h1>
        <button onClick={generateWallet}>Add SOL Wallet</button>
        {walletKeys.map((w,index) => <div key={w.private} className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-slate-800 mt-4 text-left">
            <p>Wallet {index+1}</p>
            <p>Public Key:{w.public.toBase58()}</p>
            <p>Secret Key:{w.private}</p>
        </div>)}
        </div>
    </div>
}