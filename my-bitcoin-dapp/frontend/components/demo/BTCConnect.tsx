import React from 'react';
import { useConnectModal, useBTCProvider, useAccounts } from '@particle-network/btc-connectkit';
import { Button } from '../ui/button';

const BTCConnect = () => {
    const { openConnectModal, disconnect } = useConnectModal();

    const { accounts } = useBTCProvider();

    return (
        <div>
            {accounts.length > 0 ? (
                <div className='flex flex-row items-center gap-1'>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        {accounts[0].slice(0, 10)}
                    </p>
                    <Button onClick={disconnect}>Disconnect</Button>
                </div>
            ) : (
                <Button variant='default' onClick={openConnectModal}>Connect wallet</Button>
            )}
        </div>
    );
};

export default BTCConnect;