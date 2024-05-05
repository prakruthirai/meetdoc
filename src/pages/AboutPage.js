import React from 'react';
import { Card, CardGroup } from 'react-bootstrap'; // Importing Card and CardGroup components from react-bootstrap
 // Importing Card and Button components from react-bootstrap
 import './aboutpage.css';
 
const AboutPage = () => {
  return (
    <div style={{ marginTop: '240px' }}>
      <div className="about-us-heading">
        <h1>About Us</h1>
      </div>
      
      <div className="card-container">
        <CardGroup>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Transcript</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>MOM</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. 
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}

export default AboutPage;