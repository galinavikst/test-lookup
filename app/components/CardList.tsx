"use client";
import { List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface SearchResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface CardListProps {
  inputValue: string | null;
}

export default function CardList({ inputValue }: CardListProps) {
  const [jsonData, setJsonData] = useState<SearchResponse[] | null>(null);
  const [cards, setCards] = useState<SearchResponse[] | null>(null);

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

  return (
    inputValue !== "" &&
    cards !== null && (
      <List className="flex flex-wrap gap-5 justify-center">
        {cards.map((obj) => (
          <ListItem
            key={obj.id}
            className="py-2.5 px-5 w-fit text-cyan-400 border-2 border-cyan-400 rounded card"
          >
            <Typography variant="button">
              {obj.first_name + " " + obj.last_name}
            </Typography>
          </ListItem>
        ))}
        {!jsonData && <div>Loading...</div>}
      </List>
    )
  );
}
