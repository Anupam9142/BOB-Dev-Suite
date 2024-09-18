"use client"
import React, { ReactNode } from 'react';
import {
    ConnectProvider,
    OKXConnector,
    UnisatConnector,
    BitgetConnector,
    TokenPocketConnector,
    BybitConnector,
    WizzConnector,
    XverseConnector
} from '@particle-network/btc-connectkit';
import { MerlinTestnet, Merlin, BEVMTestnet, BEVM, MAPProtocolTestnet, MAPProtocol, SatoshiVMTestnet, BSquaredTestnet, Mantle, BitlayerTestnet, BotanixTestnet, PolygonzkEVMCardona } from '@particle-network/chains';


const BTCProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ConnectProvider
            options={{
                projectId: '121668da-9bcc-4351-a606-f7626d6c5cdb', // -
                clientKey: 'cRcR2GI0Nwos3Xj1WiMtAnzNzy2qrQjAnsBMZpNg', // Retrieved from https://dashboard.particle.network
                appId: 'be8b420c-f3bf-40e0-abad-3b00d9abfd12', // - 
                aaOptions: {
                    accountContracts: {
                        BTC: [
                            {
                                chainIds: [MerlinTestnet.id, Merlin.id, BEVMTestnet.id, BEVM.id, MAPProtocolTestnet.id, MAPProtocol.id, SatoshiVMTestnet.id],
                                version: '1.0.0',
                            },
                            {
                                chainIds: [BitlayerTestnet.id, BotanixTestnet.id, PolygonzkEVMCardona.id, BSquaredTestnet.id, Mantle.id],
                                version: '2.0.0',
                            },
                        ],
                    },
                },
                walletOptions: {
                    visible: true,
                }
            }}
            connectors={[new UnisatConnector(), new OKXConnector(), new BitgetConnector(), new TokenPocketConnector(), new BybitConnector(), new WizzConnector(), new XverseConnector()]}
        >
            {children}
        </ConnectProvider>
    );
};

export default BTCProvider;