import React from "react";
import { Container } from "semantic-ui-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <Container>
      <header className="api-header" style={{ cursor: "pointer" }}>
        <Link href={`/`} passHref>
          <span>WEATHER API</span>
        </Link>
      </header>
    </Container>
  );
}
