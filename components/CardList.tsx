"use client";
import { List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ModalCard from "./ModalCard";
import gsap from "gsap";
export interface SearchResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

interface CardListProps {
  inputValue: string | null;
}

export default function CardList({ inputValue }: CardListProps) {
  const [jsonData, setJsonData] = useState<SearchResponse[] | null>(null);
  const [cards, setCards] = useState<SearchResponse[] | null>(null);
  const [openModalId, setOpenModalId] = React.useState<number | null>(null);
  // const itemRefs = useRef([]);
  // itemRefs.current = [];

  const handleModalOpen = (id: number) => setOpenModalId(id);
  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenModalId(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/MOCK_DATA.json");
        const data = await response.json();

        setJsonData(data);
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (inputValue === null) {
      setCards(null);
    } else {
      if (jsonData) {
        const filteredData = jsonData.filter(
          (obj) =>
            obj.first_name.toLowerCase().includes(inputValue) ||
            obj.last_name.toLowerCase().includes(inputValue)
        );
        setCards(filteredData);
      }
    }
  }, [inputValue, jsonData]);

  // gsap animation
  useEffect(() => {
    const ctx = gsap.context(() => {});
    if (cards !== null) {
      ctx.add(() => {
        gsap.to(".card", {
          opacity: 1,
          scale: 1,
          ease: "power1.inOut",
          stagger: {
            each: 0.01,
            from: "random",
          },
        });
      });
    }
    return () => ctx.revert();
  }, [cards]);

  return (
    inputValue !== "" &&
    cards !== null && (
      <List
        sx={{
          mb: { xs: 5, sm: 0 },
        }}
        className="flex flex-wrap gap-5 justify-center"
      >
        {cards.map((obj, index) => (
          <ListItem
            key={obj.id}
            onClick={() => handleModalOpen(obj.id)}
            sx={{
              width: "fit-content",
              opacity: 0,
              transform: `scale(${index % 2 === 0 ? 0.5 : 1.5})`,
            }}
            className="py-2.5 px-5 text-cyan-400 border-2 border-cyan-400 rounded card"
          >
            <Typography variant="button">
              {obj.first_name + " " + obj.last_name}
            </Typography>
            <ModalCard
              obj={obj}
              openModal={openModalId}
              handleModalClose={handleModalClose}
            />
          </ListItem>
        ))}
        {!jsonData && <ListItem>Loading...</ListItem>}
      </List>
    )
  );
}
