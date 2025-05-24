import type React from "react"
import { useState } from "react"
import { Box, Card, CardContent, CardMedia, IconButton, Typography, Rating } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import BuyButton from "./button-buy"

interface Activity {
    id: string
    title: string
    desc: string
    availableDate: Date    
    expireDate: Date
    price: number
    rating: number
    image: string
    createdAt: Date
    updatedAt: Date
}
export default function ExperienceCard({activity}: {activity: Activity}) {
  const { id, title, desc, availableDate, expireDate, price, rating, image, createdAt, updatedAt } = activity
  const [isFavorite, setIsFavorite] = useState(false)

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      sx={{
        maxWidth: 320,
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
        cursor: "pointer",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title}
          sx={{
            objectFit: "cover",
          }}
        />      
      </Box>

      <CardContent sx={{ padding: "16px" }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: 1.25,
            color: "#222",
            marginBottom: "4px",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#717171",
            fontSize: "14px",
            lineHeight: 1.4,
            marginBottom: "8px",
          }}
        >
            {desc}
        </Typography>
        <Typography
            variant="body1"
            component="h3"
            sx={{
                fontWeight: 600,
                fontSize: "16px",
                color: "#222",
                marginBottom: "4px",
                display: "flex",
                alignItems: "baseline",
                gap: "4px",
            }}
        >
            <span style={{ fontWeight: 600 }}>{`$${Number(price).toFixed(2)}`}</span>
            <span style={{ fontWeight: 400, fontSize: "13px", marginLeft: 4 }}>por persona</span>
        </Typography>
        <BuyButton fullWidth text="Comprar" showIcon={false} />

        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating
            value={rating}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#ff385c",
              },
              "& .MuiRating-iconEmpty": {
                color: "#ddd",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              color: "#717171",
              marginLeft: "4px",
            }}
          >
            {rating} ({Math.floor(Math.random() * 1000)} reviews)
          </Typography>
        </Box> */}       
      </CardContent>
    </Card>
  )
}
