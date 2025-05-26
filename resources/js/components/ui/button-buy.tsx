"use client"
import { Button, type ButtonProps, styled } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

// Estilos personalizados para el botón
const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 50, // Completamente redondeado
  padding: "10px 24px",
  textTransform: "none", // Evita que el texto esté en mayúsculas
  fontWeight: 600,
  fontSize: "0.9rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    transform: "translateY(0)",
  },
}))

interface BuyButtonProps {
  text?: string
  showIcon?: boolean
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  size?: "small" | "medium" | "large"
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
}

export default function BuyButton({
  text = "Comprar ahora",
  showIcon = true,
  color = "primary",
  size = "medium",
  fullWidth = false,
  onClick,
  disabled = false,
}: BuyButtonProps) {
  return (
    <StyledButton
      variant="contained"
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={(e) => {
        e.stopPropagation() // Evita que el evento de clic se propague
        onClick && onClick()
      }}
      disabled={disabled}
      startIcon={showIcon ? <ShoppingCartIcon /> : undefined}
    >
      {text}
    </StyledButton>
  )
}
