"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/fsw-donalds");
  };

  return (
    <>
      <div>
        <h1>hello world</h1>;<Button onClick={handleClick}>Click me</Button>
      </div>
    </>
  );
};

export default HomePage;
