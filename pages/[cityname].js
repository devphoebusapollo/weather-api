import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { Link } from "next/link";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../config";
import {
  Container,
  Header,
  Grid,
  Dimmer,
  Loader,
  Menu,
} from "semantic-ui-react";
import Flags from "../utils/Flags";

export default function ViewCity({ city }) {
  /*useEffect(async () => {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}&aqi=no`
    );
    const currentCity = await res.json();
    return setCity([currentCity]);
  }, [cityname]);*/

  return (
    <div>
      <Head>
        <title>Weather API</title>
      </Head>
      <Container>
        {
          <Container fluid>
            <Header
              as="h1"
              textAlign="center"
              style={{
                margin: ".5em auto 0 auto",
                padding: "0",
                color: "#c8d7e6",
              }}
            >{`${city?.location?.name}, ${city?.location?.region}`}</Header>
            <Header
              as="h3"
              textAlign="center"
              style={{
                margin: "0",
                padding: ".5em",
                letterSpacing: ".2em",
                color: "#c8d7e6",
              }}
            >
              <Flags item={city?.location?.country} />
              {`${city?.location?.country}`}
            </Header>
            <Container style={{ margin: "1.5em" }}>
              <Grid columns={2} padded doubling={true}>
                <Grid.Column
                  textAlign="center"
                  style={{ margin: "0", padding: "0" }}
                >
                  <p
                    style={{
                      fontSize: "7em",
                      margin: "0",
                      fontFamily: "Impact",
                    }}
                  >
                    {city?.current?.temp_c} &#8451;
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <ul className="descriptions">
                    <li key={city?.current?.wind_kph}>
                      Wind: {city?.current?.wind_kph} kmph
                    </li>
                    <li key={city?.current?.precip_mm}>
                      Precip: {city?.current?.precip_mm} mm
                    </li>
                    <li key={city?.current?.pressure_mb}>
                      Pressure {city?.current?.pressure_mb} mb
                    </li>
                  </ul>
                </Grid.Column>
              </Grid>
            </Container>
            <Container textAlign="center" style={{ margin: "1em" }}>
              <Image
                src={`https:${city?.current?.condition?.icon}`}
                alt={city?.current?.condition?.text}
                width={100}
                height={100}
              />
              <p style={{ fontSize: "2em", fontWeight: "bold" }}>
                {city?.current?.condition?.text}
              </p>
            </Container>
          </Container>
        }
      </Container>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // Fetch data from external API

  const { cityname } = params;
  const res = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}&aqi=no`
  );
  const city = await res.json();

  // Pass data to the page via props
  return { props: { city } };
}
