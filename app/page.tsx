"use client";
import { Box, Container, Link, Typography } from "@mui/material";
import Image from "next/image";
import CardList from "../components/CardList";
import Search from "../components/Search";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <main className="min-h-screen sm:p-10 p-2 relative">
      <Container className="">
        <Box className="flex gap-5 justify-center">
          <Image
            src="/logo_lidingo.svg"
            alt="Lidingo Logo"
            width={80}
            height={37}
            priority
          />
          <Typography variant="h1" sx={{ fontSize: 60 }}>
            Lidingo Portal
          </Typography>
        </Box>
        <Search onInputChange={handleInputChange} />
        <CardList inputValue={inputValue} />
        <Typography className="absolute w-full flex justify-center right-[50%] translate-x-1/2 -translate-y-1/2 opacity-50 bottom-1">
          DataBase from{"\u00A0"}
          <Link target="a_blank" href="https://www.mockaroo.com/">
            Mockaroo
          </Link>
        </Typography>
      </Container>
    </main>
  );
}
