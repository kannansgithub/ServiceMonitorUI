import React from "react";
import { Container, Button } from "shards-react";

const Notfound = () => (
    <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
            <div className="error__content">
                <h2>404</h2>
                <h3>Page notfound!</h3>
                <p>There was a problem to find your page. Please try different page.</p>
                <Button pill>&larr; Go Back</Button>
            </div>
        </div>
    </Container>
);

export default Notfound;
