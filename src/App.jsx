import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import Badge from './components/Badge';
import { SolanaWallet } from './components/SolanaWallet';
function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
     <div className='grid grid-cols-3 gap-5'>
        {mnemonic.split(" ").length > 1 && mnemonic.split(" ").map((mn, index) => (
          <Badge key={index} title={mn}/>
        ))}
      </div>
      <button className="mt-4" onClick={async function(){
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>Create Seed Phrase</button>
      {mnemonic != "" && <div><SolanaWallet mnemonic={mnemonic}/></div>}
      
    </>
    
  )
}

export default App
