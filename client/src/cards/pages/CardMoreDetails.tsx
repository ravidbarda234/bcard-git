import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import CardsFeedback from "../components/CardsFeedback";
import { Button, Grid, Typography, Divider, Link } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import MapCard from "../components/card/MapCard";

const CardMoreDetails = () => {
  const { cardId } = useParams();
  const { card, error, isLoading, handleGetCard, handleLikeCard, value } =
    useCards();
  const { filterdCards } = value;
  const navigate = useNavigate();

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;

  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card)
    return (
      <Container>
        <PageHeader
          title="Business info"
          subtitle="Here you can see more details of the business"
        />
        <div>
          <Grid container spacing={2}>
            <Grid sx={{ backgroundColor: "" }} item xl={8} xs={12} md={8}>
              <Typography
                sx={{ textDecoration: "underline" }}
                className="center"
                variant="h5"
              >
                {" "}
                Business Card info
              </Typography>
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Title <Typography>{card.title}</Typography>
              </Typography>
              <Divider />
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Sub Title <Typography>{card.subtitle}</Typography>
              </Typography>
              <Divider />
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Description <Typography>{card.description}</Typography>
              </Typography>
              <Divider />
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Site
                <Typography>
                  <Link>{card.web}</Link>
                </Typography>
              </Typography>
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Email{" "}
                <Typography>
                  {" "}
                  <Link>{card.email}</Link>
                </Typography>
              </Typography>
              <Divider />
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Phone<Typography>{card.phone}</Typography>
              </Typography>
              <Divider />
              <Divider />
              <Typography fontWeight="bold" marginTop={1} fontSize={18}>
                Full address {""}
                <Typography>
                  {card.address.state} {card.address.country}{" "}
                  {card.address.city} {card.address.street}{" "}
                  {card.address.houseNumber}
                  {card.address.zip}
                </Typography>
              </Typography>
              <Divider />
            </Grid>
            <Grid item xl={4} xs={12} md={6}>
              <Card onLike={() => {}} card={card} onDelete={() => {}} />
            </Grid>
            <CardsFeedback
              cards={filterdCards}
              error={error}
              isLoading={isLoading}
              onDelete={console.log}
            />
            <Grid item xs={12} lg={6} md={6} bgcolor={""}>
              <MapCard address={card.address} />
            </Grid>
          </Grid>
        </div>

        <br />
        <br />
      </Container>
    );
  return null;
};

export default CardMoreDetails;
