import { ConnectWallet } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

export default function Showcasecover() {
  return (
    <div className="flex justify-center items-center">
      <Image src="/hero.png" width={250} height={250} alt="BOB Dev SDK" />  
    </div>
  );
}
