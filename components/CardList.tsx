"use client";
import { List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ModalCard from "./ModalCard";
import gsap from "gsap";
import { CSSPlugin, ScrollTrigger } from "gsap/all";
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
  const itemEls = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

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
  }, [inputValue]);

  //gsap animation
  useEffect(() => {
    if (cards !== null) {
      const items = document.querySelectorAll(".card");
      const tl = gsap.timeline();

      items.forEach((el, index) => {
        gsap.fromTo(
          el,
          {
            duration: 0.1,
            opacity: 0,
            force3D: true,
            //stagger: index * 0.01,
            delay: index * 0.01,
          },
          { opacity: 1 }
        );
        gsap.fromTo(
          el,
          {
            duration: 0.1,
            scale: index % 2 === 0.8 ? 0 : 1.2,
            //delay: index * 0.01,
          },
          { scale: 1 }
        );
        //return () => tl.kill();
      });
    }
  }, [cards]);

  return (
    inputValue !== "" &&
    cards !== null && (
      <List
        ref={itemEls}
        sx={{
          mb: { xs: 5, sm: 0 },
        }}
        className="flex flex-wrap gap-5 justify-center"
      >
        {cards.map((obj, index) => (
          <ListItem
            key={obj.id}
            onClick={() => handleModalOpen(obj.id)}
            sx={{ width: "fit-content" }}
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
