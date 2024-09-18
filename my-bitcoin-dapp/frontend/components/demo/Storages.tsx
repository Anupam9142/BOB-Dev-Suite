"use client";
import { client, selectSp } from '../../lib/client';
import { getOffchainAuthKeys } from '../../utils/offchainAuth';
import { Long, OnProgressEvent, VisibilityType } from '@bnb-chain/greenfield-js-sdk';
import { useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Button } from "@/components/ui/button";
import {ethers} from 'ethers';

export default function Storages ()  {

  const address  = useAddress();
  
  const [info, setInfo] = useState<{
    bucketName: string;
    objectName: string;
    file: File | null;
  }>({
    bucketName: '',
    objectName: '',
    file: null
  });

  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Greenfield Storage
          </h1>
          <p className="text-xl text-gray-600">
            Create Bucket / Create Object / Upload File / Download File
          </p>
        </div>
      </section>

      <div className='bg-white shadow-md rounded p-6 mb-6'>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bucket</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={info.bucketName}
            placeholder="bucket name"
            onChange={(e) => {
              setInfo({ ...info, bucketName: e.target.value });
            }}
          />
        </div>

        <div className="mb-4">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={async () => {
            if (!address) return;

            const spInfo = await selectSp();
            console.log('spInfo', spInfo);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const p = provider.provider;

            console.log(provider,"provider<<<<");

            const offChainData = await getOffchainAuthKeys(address, p);

            if (!offChainData) {
              alert('No offchain, please create offchain pairs first');
              return;
            }

            console.log(provider,"provider",offChainData,"offChainData");

            try {
              const createBucketTx = await client.bucket.createBucket(
                {
                  bucketName: info.bucketName,
                  creator: address,
                  primarySpAddress: spInfo.primarySpAddress,
                  visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
                  chargedReadQuota: Long.fromString('0'),
                  paymentAddress: address,
                },
              );

              const simulateInfo = await createBucketTx.simulate({
                denom: 'BNB',
              });

              console.log('simulateInfo', simulateInfo);

              const res = await createBucketTx.broadcast({
                denom: 'BNB',
                gasLimit: Number(simulateInfo?.gasLimit),
                gasPrice: simulateInfo?.gasPrice || '5000000000',
                payer: address,
                granter: '',
              });

              if (res.code === 0) {
                alert('success');
              }
            } catch (err) {
              console.log(typeof err)
              if (err instanceof Error) {
                alert(err.message);
              }
              if (err && typeof err ==='object') {
                alert(JSON.stringify(err))
              }
            }

          }}
          >
            Create Bucket Tx
          </Button>
        </div>
      </div>

      <div className='bg-white shadow-md rounded p-6 mb-6'>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Object</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={info.objectName}
            placeholder="object name"
            onChange={(e) => {
              setInfo({ ...info, objectName: e.target.value });
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">File</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.88 4.12a4.5 4.5 0 1 0-6.36 6.36L10 12l.12.12a4.5 4.5 0 1 0 6.36-6.36L16 6l.88-.88zm-1.06 5.24a3.5 3.5 0 1 1-4.95-4.95 3.5 3.5 0 0 1 4.95 4.95zM7 8l1.293-1.293 3.207 3.207L15 7.5 14.5 7l-3.5 3.5-3.207-3.207L7 8zm1.5 8H4v-2h1.5v2zM4 16H3v-1.5h1V16zm12 0h-1.5v-2H16v2zM12 16h-1v-1.5h1V16z"/></svg>
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input type='file' className="hidden" onChange={(e) => {
                if (e.target.files) {
                  setInfo({
                    ...info,
                    file: e.target.files[0]
                  })
                }
              }} />
            </label>
          </div>
        </div>

        {/* upload */}
        <div className="mb-4">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={async () => {
              if (!address || !info.file) return;

              const spInfo = await selectSp();
              console.log('spInfo', spInfo);

              const provider = new ethers.providers.Web3Provider(window.ethereum);

              const offChainData = await getOffchainAuthKeys(address, provider);

              if (!offChainData) {
                alert('No offchain, please create offchain pairs first');
                return;
              }

              try {
                const res = await client.object.delegateUploadObject({
                  bucketName: info.bucketName,
                  objectName: info.objectName,
                  body: info.file,
                  delegatedOpts: {
                    visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
                  },
                  onProgress: (e: OnProgressEvent) => {
                    console.log('progress: ', e.percent);
                  },
                }, {
                  type: 'EDDSA',
                  address: address,
                  domain: window.location.origin,
                  seed: offChainData.seedString,
                })

                if (res.code === 0) {
                  alert('create object success');
                }
              } catch (err) {
                console.log(typeof err)
                if (err instanceof Error) {
                  alert(err.message);
                }
                if (err && typeof err ==='object') {
                  alert(JSON.stringify(err))
                }
              }
            }}
          >
            Delegate Upload
          </Button>
        </div>

        {/* Download */}
        <div className='mb-4'>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={async () => {
              if (!address) return;

              const spInfo = await selectSp();
              console.log('spInfo', spInfo);

              const provider = new ethers.providers.Web3Provider(window.ethereum);
              const offChainData = await getOffchainAuthKeys(address, provider);
              if (!offChainData) {
                alert('No offchain, please create offchain pairs first');
                return;
              }

              const res = await client.object.downloadFile(
                {
                  bucketName: info.bucketName,
                  objectName: info.objectName,
                },
                {
                  type: 'EDDSA',
                  address,
                  domain: window.location.origin,
                  seed: offChainData.seedString,
                },
              );

              console.log(res);
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </>
  );
};
