"use client";
import type { NextPage } from "next";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import WalletConnection from "@/components/demo/WalletConnection";
import UserAuthentication from "@/components/demo/UserAuthentication";
import DecentralizedStorage from "@/components/demo/DecentralizedStorage";
import ContractInteraction from "@/components/demo/ContractInteraction";
import Storages from "@/components/demo/Storages";
import Image from "next/image";
import Showcasecover from "@/components/demo/Showcasecover";
import AccountAbstraction from "@/components/demo/AccountAbstraction";
import BTCConnect from "@/components/demo/BTCConnect";

const tabs = [
  { name: "Introduction", component: <Showcasecover />},
  { name: "Account Abstraction", component: <AccountAbstraction />},
  { name: "Wallet Connection", component: <WalletConnection /> },
  { name : "BTC Connect" , component : <BTCConnect /> },
  { name: "Contract Interaction", component: <ContractInteraction /> },
  { name: "User Authentication", component: <UserAuthentication /> },
  { name: "Store on BNB GreenField", component: <Storages /> },
  { name: "IPFS Storage", component: <DecentralizedStorage /> },
];

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>(tabs[0]);

  return (
    <div className="w-full mx-auto pr-8 pl-8 max-w-7xl relative pb-10 mt-32">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        BOB Dev SDK{" "}
        <span
          className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4
        text-gray-400
        "
        >
          powered by shadcn UI, Thirdweb , ParticleAuth Account Abstraction
        </span>
      </h1>
      <p className="text-xl text-muted-foreground">
        A comprehensive web3 dev stack for developers to quickly build Dapps on BOB Chains including OPBNB, BSC and BOB GreenField.
      </p>
      <div className="flex flex-row items-center gap-4 pt-6 pb-16 ">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="https://github.com/Abhijeet1520/BOB-Dev-Suite/"
          target="_blank"
        >
          GitHub
        </Link>
      </div>

      <div className="flex flex-col  md:flex-row w-full">
        <div className="flex flex-col items-start justify-start w-full md:w-96 pr-8">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors mt-2">
            What&rsquo;s Included?
          </h2>
          <p className="leading-7 mt-2">
            Explore the features of BOB Dev SDK below.
          </p>

          <div className="mb-4 flex flex-col items-start mt-4 flex-nowrap overflow-x-auto w-full md:w-60  ">
            {tabs.map((tab) => (
              <button
                className={`w-full text-left pl-3 py-2 flex items-center pr-6 border-l-2 font-medium transition-colors duration-200 ${
                  tab.name === activeTab.name
                    ? "font-bold text-white lg:border-l-2 border-blue-500"
                    : "text-gray-400 border-gray-700"
                } hover:text-white`}
                key={tab.name}
                onClick={() => setActiveTab(tab)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        <div
          className="border border-gray-700 rounded-lg flex-1 p-8 m-l-3 mt-4 lg:mt-0
          h-96 overflow-y-auto"
        >
          {activeTab.component}
        </div>
      </div>
    </div>
  );
};

export default Home;
