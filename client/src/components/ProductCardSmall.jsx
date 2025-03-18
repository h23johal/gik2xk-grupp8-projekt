// import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
// import { Link } from 'react-router-dom';

// function ProductCardSmall({ product }) {
//   return (
//     <Card>
//       <CardActionArea component={Link} to={`/products/${product.id}`}>
//         {product.imageUrl && (
//           <CardMedia
//             component="img"
//             height="140"
//             image={product.imageUrl}
//             alt={product.title}
//           />
//         )}
//         <CardContent>
//           <Typography variant="h6">{product.title}</Typography>
//           <Typography variant="body2">${product.price}</Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

// export default ProductCardSmall;
// ProductCardSmall.jsx
// import { Card, CardContent, CardMedia, Typography, CardActionArea, Box } from '@mui/material';
// import { Link } from 'react-router-dom';

// function ProductCardSmall({ product }) {
//   return (
//     <Card sx={{
//       backgroundColor: '#2A211C',
//       borderRadius: '10px',
//       border: '1px solid rgba(176, 141, 87, 0.4)',  // Brass border
//       overflow: 'hidden',
//       transition: 'all 0.3s ease-in-out',
//       boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
//       '&:hover': {
//         transform: 'scale(1.02)',
//         boxShadow: '0px 10px 25px rgba(0,0,0,0.5)',
//       }
//     }}>
//       <CardActionArea component={Link} to={`/products/${product.id}`}>
//         {product.imageUrl && (
//           <CardMedia
//             component="img"
//             height="220"
//             image={product.imageUrl}
//             alt={product.title}
//             sx={{ objectFit: 'cover', filter: 'brightness(0.9)' }}
//           />
//         )}
//         {/* Off-white Bottom Section */}
//         <Box sx={{
//           backgroundColor: '#F5F1EB',  // Classy off-white
//           padding: '16px',
//           borderTop: '1px solid rgba(176, 141, 87, 0.2)',  // Soft brass line
//         }}>
//           <Typography variant="h6" color="secondary" sx={{ fontWeight: 500 }}>
//             {product.title}
//           </Typography>
//           <Typography variant="body2" color="primary" sx={{ fontWeight: 400 }}>
//             ${product.price}
//           </Typography>
//         </Box>
//       </CardActionArea>
//     </Card>
//   );
// }

// export default ProductCardSmall;

import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCardSmall({ product }) {
  return (
    <Card sx={{
      bgcolor: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
      },
    }}>
      <CardActionArea component={Link} to={`/products/${product.id}`}>
        {product.imageUrl && (
          <CardMedia
            component="img"
            height="160"
            image={product.imageUrl}
            alt={product.title}
            sx={{
              objectFit: 'cover',
              opacity: 0.8,
              transition: 'opacity 0.2s ease-in-out',
              '&:hover': { opacity: 1 },
            }}
          />
        )}
        <CardContent>
          <Typography variant="h6" color="text.primary">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardSmall;

// import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
// import { Link } from 'react-router-dom';

// function ProductCardSmall({ product }) {
//   return (
//     <Card sx={{
//       bgcolor: 'rgba(255,255,255,0.05)',
//       backdropFilter: 'blur(12px)',
//       border: '1px solid rgba(255,255,255,0.1)',
//       borderRadius: '12px',
//       boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
//       transition: 'box-shadow 0.2s ease',
//       '&:hover': {
//         boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
//       },
//     }}>
//       <CardActionArea component={Link} to={`/products/${product.id}`}>
//         {product.imageUrl && (
//           <CardMedia
//             component="img"
//             height="160"
//             image={product.imageUrl}
//             alt={product.title}
//             sx={{
//               objectFit: 'cover',
//               opacity: 0.9,
//             }}
//           />
//         )}
//         <CardContent>
//           <Typography variant="h6" color="text.primary">
//             {product.title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             ${product.price}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

// export default ProductCardSmall;