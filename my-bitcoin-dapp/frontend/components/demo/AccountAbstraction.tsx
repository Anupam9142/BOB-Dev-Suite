"use client";
import React, { useState, useEffect } from 'react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import {  BOBTestnet } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import styles from "../../styles/AccountAbstraction.module.css";

const AccountAbstraction = () => {
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();

  const smartAccount = new SmartAccount(provider, {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    aaOptions: {
      accountContracts: {
        SIMPLE: [{ chainIds: [BOBTestnet.id], version: '1.0.0' }]
      }
    }
  });

  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, smartAccount, customProvider]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    // @ts-ignore
    setBalance(ethers.utils.formatEther(balanceResponse));
  };

  const handleLogin = async (authType: any) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: BNBChainTestnet,
      });
    }
  };

  const executeUserOp = async () => {
    const signer = customProvider.getSigner();
    const tx = {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("1"),
    };
    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();
    console.log({
      message: txReceipt.transactionHash
    });
  };

  return (
    <div className={styles.App}>
      <div className={styles.logosection}>
        <img src="https://i.imgur.com/EerK7MS.png" alt="Logo 1" className={`${styles.logo} ${styles.logoBig}`} />
        <img src="https://i.imgur.com/xbvNnWD.png" alt="Logo 2" className={`${styles.logo} ${styles.logoBig}`} />
      </div>
      {!userInfo ? (
        <div className={styles.loginsection}>
          <button className={styles.signbutton} onClick={() => handleLogin('google')}>
            <img src="https://i.imgur.com/nIN9P4A.png" alt="Google" className={styles.icon} />
            Sign in with Google
          </button>
          <button className={styles.signbutton} onClick={() => handleLogin('twitter')}>
            <img src="https://i.imgur.com/afIaQJC.png" alt="Twitter" className={styles.icon}/>
            Sign in with X
          </button>
        </div>
      ) : (
        <div className={styles.profilecard}>
          <h2 className='text-black'>{userInfo.name}</h2>
          <div className={styles.balancesection}>
            <small className="text-green-400">{balance} BOB</small>
            <button className={styles.signmessagebutton} onClick={executeUserOp}>Execute User Operation</button>
            <button className={styles.disconnectbutton} onClick={disconnect}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountAbstraction;
