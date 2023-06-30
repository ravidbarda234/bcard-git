import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          <Typography sx={{ fontSize: 18 }}>
            This website was built by Ravid Barda, a student at HackerU College
            and as part of his studies he built this website. This website is
            basically a platform for business owners to advertise their business
            through business cards, it is basically a kind of small social
            network for business advertising.
          </Typography>
          <Divider sx={{ margin: 2, fontSize: 18 }}>How Use?</Divider>
          <Typography sx={{ fontSize: 18 }}>
            Using the site is very simple, first you need to Signup by clicking
            the signup button, you are required to fill in details according to
            the form, it is recommended to add a profile picture so that
            potential customers can see the business owner. Also in the form you
            have the option to mark in a check box whether you would like to be
            regular users who can only view other people's cards or choose to be
            a business and then all options are open, you can create business
            cards and you can create and of course mark if you liked business
            cards and also to delete and edit the card. In the menu on the right
            you can see that there is a link to the profile, in this link you
            can find all your details and even correct your details if you want.
            In addition to your convenience, the site can be darkened with one
            click on the sign of the moon on the right. As I said, using the
            site is very simple, just log in and register. Enjoy your stay on
            the site, I would love to hear from you if there are any questions
            or anything else.
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
