import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getOne,
  removeProduct,
  updateProduct,
} from "../../../services/ProductService";
import { useSnackbar } from "../../../context/SnackbarContext";
import {
  Box,
  Button,
  Container,
  Chip,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

function ProductManagementForm() {
  const { showSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyProduct = {
    id: 0,
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  };
  const [product, setProduct] = useState(emptyProduct);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  function onDelete() {
    setOpen(true); // Open confirmation dialog
  }

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(emptyProduct);
    }
  }, [id]);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
  }

  async function onSave() {
    try {
      if (product.id === 0) {
        const response = await createProduct(product);
        navigate("/admin", { replace: true, state: response });
      } else {
        const response = await updateProduct(product);
        showSnackbar("Produkten har uppdaterats!", "success");
        navigate(`/admin/${product.id}`, { replace: true, state: response });
      }
    } catch (error) {
      showSnackbar(error.message, "error"); // 🔥 Visar backendens valideringsfel
    }
  }

  function confirmDelete() {
    setIsDeleting(true); // Prevent multiple clicks
    removeProduct(product.id)
      .then((response) => {
        navigate("/admin", { replace: true, state: response });
      })
      .finally(() => {
        setIsDeleting(false);
        setOpen(false);
      });
  }
  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        onChange={onChange}
        value={product.title}
        name="title"
        id="title"
        label="Titel"
        fullWidth
      />
      <TextField
        onChange={onChange}
        value={product.description}
        multiline
        minRows={5}
        name="description"
        id="description"
        label="Description"
        fullWidth
      />
      <TextField
        onChange={onChange}
        value={product.price}
        name="price"
        id="price"
        label="Pris"
        fullWidth
      />
      <TextField
        onChange={onChange}
        value={product.imageUrl}
        name="imageUrl"
        id="imageUrl"
        label="Sökväg till bild"
        fullWidth
      />

      <Box display="flex" gap={1} justifyContent="flex-start">
        {id && (
          <Button onClick={onDelete} variant="contained" color="error">
            Ta bort
          </Button>
        )}
        <Button onClick={onSave} variant="contained" color="success">
          Spara
        </Button>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Bekräfta borttagning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Är du säker på att du vill ta bort denna produkt? Denna åtgärd kan
            inte ångras.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Avbryt
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Closes after 3s
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Produkten har uppdaterats!
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default ProductManagementForm;
