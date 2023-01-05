import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({
  name,
  latitude,
  longitude,
  country,
  countryCode,
}) {
  return (
    <Card
      sx={{ minWidth: 275, width: "fit-content", marginBottom: 2 }}
      className="place-card"
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">
          {country} ({countryCode})
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Latitude: {latitude}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Longitude: {longitude}
        </Typography>
      </CardContent>
    </Card>
  );
}
