import React from "react";
import ImageInterface from "../../interfaces/ImageInterface";
import CardMedia from "@mui/material/CardMedia";

type Props = { image: ImageInterface };

const CardHead: React.FC<Props> = ({ image }) => {
  const { url, alt } = image;
  return (
    <CardMedia
      component="img"
      image={url}
      alt={alt}
      sx={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
    />
  );
};

export default CardHead;
