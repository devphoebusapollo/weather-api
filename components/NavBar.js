import React from "react";
import { Container } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Container>
      <header className="api-header">
        <a href="/">
          <span>WEATHER API</span>
        </a>
      </header>
    </Container>
  );
}
