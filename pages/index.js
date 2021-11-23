import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { API_KEY } from "../config";
import {
  List,
  Container,
  Input,
  Form,
  Button,
  Message,
  Menu,
} from "semantic-ui-react";
import Flags from "../utils/Flags";

export default function Home() {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChangeInput = async (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searches = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${location}`
      );
      const searchResponses = await searches.json();
      return setSuggestions(searchResponses);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      style={{
        margin: "0",
        padding: "0",
      }}
    >
      <Head>
        <title>NextJs Weather App</title>
        <meta name="description" content="My Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ margin: "0", padding: "0" }}>
        <Form
          style={{
            display: "flex",
            margin: ".6em",
            boxSizing: "border-box",
            padding: "0",
          }}
        >
          <input
            id="search-input"
            type="text"
            value={location}
            placeholder="Enter your place..."
            onChange={handleChangeInput}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "#c8d7e6",
              color: "#04203c",
              fontSize: "1.2em",
              padding: ".5em",
              padding: ".5em",
              outline: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="search-button"
          >
            Search
          </button>
        </Form>
        {suggestions.length > 0 ? (
          suggestions.map((city) => (
            <List
              key={city.id}
              divided
              relaxed
              style={{ cursor: "pointer", color: "#c8d7e6" }}
            >
              <Link href={`/${city.name}`}>
                <List.Item
                  style={{
                    borderBottom: "1px solid #c8d7e6",
                    paddingBottom: "1em",
                  }}
                >
                  <List.Content>
                    <List.Header
                      style={{
                        cursor: "pointer",
                        color: "#c8d7e6",
                        cursor: "pointer",
                        color: "#c8d7e6",
                      }}
                    >
                      {city.name}
                    </List.Header>
                    <Flags item={city.country} />
                    {city.country}
                  </List.Content>
                </List.Item>
              </Link>
            </List>
          ))
        ) : (
          <Message
            header="Make sure to consider the following"
            list={[
              "Enter a specific address for a specific result",
              "Make sure to not enter any invalid characters",
              "Make sure the name is a valid name or correctly spelled",
            ]}
            style={{ background: "none", color: "#c8d7e6" }}
          />
        )}
      </Container>
    </Container>
  );
}
