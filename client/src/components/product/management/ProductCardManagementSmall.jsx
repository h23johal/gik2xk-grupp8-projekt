import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
//hemmagjord overlay komponent
import Overlay from "../../Overlay";
import RestoreIcon from "@mui/icons-material/Restore";
import { restoreProduct } from "../../../services/ProductService";
import { useSnackbar } from "../../../context/SnackbarContext";

function ProductCardManagementSmall({ product, refetch }) {
  const { showSnackbar } = useSnackbar();

  const handleRestore = async (e) => {
    e.stopPropagation();
    try {
      await restoreProduct(product.id);
      showSnackbar("Produkten återställdes!", "success");
      refetch();
    } catch (err) {
      console.error("Fel vid återställning:", err);
    }
  };

  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      sx={{
        //fast höjd och bredd för rutorna
        width: 235,
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "default",
        bgcolor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        overflow: "hidden",
      }}
    >
      <Overlay
        overlayContent={
          product.deletedAt ? (
            //Återställningsknapp om produkten är "borttagen"
            <IconButton
              onClick={handleRestore}
              sx={{
                color: "lightgreen",
                fontSize: 40,
                transform: "translateY(5px)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(0px)" },
              }}
            >
              <RestoreIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            // annars, redigera-knapp
            <IconButton
              component={Link}
              to={`/admin/${product.id}`}
              sx={{
                color: "white",
                fontSize: 40,
                transform: "translateY(5px)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(0px)" },
              }}
            >
              <EditIcon sx={{ fontSize: 50 }} />
            </IconButton>
          )
        }
      >
        {product.imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={product.imageUrl}
            alt={product.title}
            sx={{ objectFit: "cover" }}
          />
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            color="text.primary"
            noWrap
            sx={{ textOverflow: "ellipsis" }}
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
          {product.deletedAt && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 1, display: "block", fontWeight: "bold" }}
            >
              Borttagen
            </Typography>
          )}
        </CardContent>
      </Overlay>
    </Card>
  );
}

export default ProductCardManagementSmall;
