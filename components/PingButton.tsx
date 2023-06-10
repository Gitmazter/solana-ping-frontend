import { FC, useEffect, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import * as web3 from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react' 
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'


export const PingButton: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [ solscanLink, setSolscanLink ] = useState("")

	useEffect(() => {

	}, [solscanLink])

	const clearData = () => {
	}

    const onClick = async() => {
        if (!connection || !publicKey) {return}
		
		const programId = new web3.PublicKey(process.env.NEXT_PROGRAM_ID);
		const programDataAcc = new web3.PublicKey(process.env.NEXT_DATA_ACCOUNT);

		console.log(programId);
		console.log(programDataAcc);
		
		const transaction = new web3.Transaction()
		const transactionInstructions = new web3.TransactionInstruction({
			keys: [
				{
					pubkey: programDataAcc,
					isSigner: false,
					isWritable: true
				}
			],
			programId
		})

		transaction.add(transactionInstructions)
		sendTransaction(transaction, connection).then(sig => {
			setSolscanLink(`https://solscan.io/tx/${sig}?cluster=devnet`)
			//window.open(`https://solscan.io/tx/${sig}?cluster=devnet`)
			console.log(sig);
		})
		
    }
    
	return (
		publicKey ? 
		<>
			<div className={styles.buttonContainer} onClick={onClick}>
				<button className={styles.button}>Ping!</button>
			</div>
			<a href={solscanLink} onClick={clearData} target="_blank" className='pingReceipt'>{solscanLink ? "Solscan Receipt" : ""}</a>
		</>

		:
		<WalletMultiButton/>
	)
}

