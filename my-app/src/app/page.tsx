"use client";
import Hero from "../Components/pages/hero";
import Service from "../Components/pages/service";
import Index from "../Components/pages/index";
import ChatComponent from "./chatbot/chat";


export default function Home() {
  return (
    <main>
      <Hero />
      <Index />
      <Service />
     
      
    </main>
  );
}
