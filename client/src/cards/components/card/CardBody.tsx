import React from "react";
import CardInterface from "../../interfaces/CardInterface";
import CardHeader from "@mui/material/CardHeader";
import { Divider, Box } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardBodyRow from "./CardBodyRow";

type Props = { card: CardInterface };

const CardBody: React.FC<Props> = ({ card }) => {
  const { title, subtitle, address, phone, bizNumber } = card;
  const { city, houseNumber, street, country } = address;
  return (
    <CardContent sx={{ pb: 1 }}>
      <CardHeader title={title} subheader={subtitle} sx={{ p: 0, mb: 1 }} />
      <Divider />
      <Box mt={1}>
        <CardBodyRow title="Phone" content={phone} />
        <CardBodyRow
          title="Address"
          content={`${street} ${houseNumber} ${city} ${country}`}
        />
        <CardBodyRow title="card number" content={String(bizNumber)} />
      </Box>
    </CardContent>
  );
};

export default CardBody;
