"use client";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const GridItem = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #e1e1e1;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GridPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const { data: session } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/send`,
          {
            email: inputValue,
          }
        );
        console.log("Data inserted:", response.data);
        setItems([...items, inputValue]);
        setInputValue("");
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  };

  if (session) {
    return (
      <Container>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleAddItem}
          placeholder="Enter an email and press Enter"
        />
        <Grid>
          {items.map((item, index) => (
            <GridItem key={index}>{item}</GridItem>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container>
        Not signed in
        <br />
        <button onClick={() => signIn()}>Sign in</button>
      </Container>
    );
  }
};

export default GridPage;
