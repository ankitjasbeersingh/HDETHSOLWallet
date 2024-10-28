import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    async function generateWallet(){
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivationPath);
        const privateKey = child.privateKey;
        const wallet = new Wallet(privateKey);
        setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses,{private:privateKey,public:wallet.address}])
    }
    return (
        <div className="mt-12">
            
            <div className="border border-[light-grey] border-solid rounded-2xl">
                <h1>Eth</h1>
                <button onClick={generateWallet}>Add ETH Wallet</button>
            {addresses.map((w,index)=> <div key={w.private} className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-gray-800 mt-4 text-left">
            <p>Wallet {index+1}</p>
            <p>Public Key:{w.public}</p>
            <p>Secret Key:{w.private}</p>
            </div>)}
            </div>
        </div>
    );
}