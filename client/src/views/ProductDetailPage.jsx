// // // import { useState, useEffect, useRef } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { getOne } from "../services/ProductService";
// // // import ProductCardLarge from "../components/product/ProductCardLarge";
// // // import ReviewCarousel from "../components/review/ReviewCarousel";
// // // import ReviewAccordion from "../components/review/ReviewAccordion";
// // // import AddReviewForm from "../components/review/AddReviewForm";
// // // import { canUserRate } from "../services/RatingService";
// // // import AddToCart from "../components/cart/AddToCart";
// // // import Grid from "@mui/material/Grid2";
// // // import { useAuth } from "../context/AuthContext";

// // // function ProductDetailPage() {
// // //   const { id } = useParams();
// // //   const { user } = useAuth();
// // //   const [product, setProduct] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedReviewId, setSelectedReviewId] = useState(null);
// // //   const [canRate, setCanRate] = useState(false);
// // //   const reviewsAccordionRef = useRef(null);

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     getOne(id)
// // //       .then((data) => {
// // //         setProduct(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching product:", err);
// // //         setLoading(false);
// // //       });

// // //     if (user) {
// // //       canUserRate(id, user.id).then(setCanRate);
// // //     }
// // //   }, [id, user]);

// // //   const handleReviewClick = (reviewId) => {
// // //     setSelectedReviewId(reviewId);
// // //     if (reviewsAccordionRef.current) {
// // //       reviewsAccordionRef.current.expandAccordion();
// // //       setTimeout(() => {
// // //         reviewsAccordionRef.current.scrollToReview(reviewId);
// // //       }, 300);
// // //     }
// // //   };

// // //   if (loading) return <div>Loading...</div>;
// // //   if (!product) return <div>Product not found</div>;

// // //   return (
// // //     <>
// // //       <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
// // //         <Grid item xs={12}>
// // //           <ReviewCarousel productId={id} onReviewClick={handleReviewClick} />
// // //         </Grid>

// // //         <Grid item xs={12} md={8}>
// // //           <ProductCardLarge product={product} />
// // //         </Grid>

// // //         <Grid item xs={12} md={4}>
// // //           <AddToCart product={product} />
// // //         </Grid>

// // //         <Grid item xs={12}>
// // //           <ReviewAccordion
// // //             productId={id}
// // //             ref={reviewsAccordionRef}
// // //             selectedReviewId={selectedReviewId}
// // //           />
// // //         </Grid>
// // //         {canRate && (
// // //           <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}>
// // //             <AddReviewForm productId={id} userId={user.id} />
// // //           </Grid>
// // //         )}
// // //       </Grid>
// // //     </>
// // //   );
// // // }

// // // export default ProductDetailPage;
// // // import { useState, useEffect, useRef } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { getOne } from "../services/ProductService";
// // // import ProductCardLarge from "../components/product/ProductCardLarge";
// // // import ReviewCarousel from "../components/review/ReviewCarousel";
// // // import ReviewAccordion from "../components/review/ReviewAccordion";
// // // import AddReviewForm from "../components/review/AddReviewForm";
// // // import { canUserRate } from "../services/RatingService";
// // // import AddToCart from "../components/cart/AddToCart";
// // // import Grid from "@mui/material/Grid2";
// // // import { useAuth } from "../context/AuthContext";

// // // function ProductDetailPage() {
// // //   const { id } = useParams();
// // //   const { user } = useAuth();
// // //   const [product, setProduct] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [selectedReviewId, setSelectedReviewId] = useState(null);
// // //   const [canRate, setCanRate] = useState(false);
// // //   const [refreshKey, setRefreshKey] = useState(0);
// // //   const reviewsAccordionRef = useRef(null);

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     getOne(id)
// // //       .then((data) => {
// // //         setProduct(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching product:", err);
// // //         setLoading(false);
// // //       });

// // //     if (user) {
// // //       canUserRate(id, user.id).then(setCanRate);
// // //     }
// // //   }, [id, user]);

// // //   const handleReviewClick = (reviewId) => {
// // //     setSelectedReviewId(reviewId);
// // //     if (reviewsAccordionRef.current) {
// // //       reviewsAccordionRef.current.expandAccordion();
// // //       setTimeout(() => {
// // //         reviewsAccordionRef.current.scrollToReview(reviewId);
// // //       }, 300);
// // //     }
// // //   };

// // //   // Refresh callback
// // //   const refreshReviews = () => setRefreshKey((prev) => prev + 1);

// // //   if (loading) return <div>Loading...</div>;
// // //   if (!product) return <div>Product not found</div>;

// // //   return (
// // //     <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
// // //       <Grid item xs={12}>
// // //         <ReviewCarousel key={refreshKey} productId={id} onReviewClick={handleReviewClick} />
// // //       </Grid>
// // //       <Grid item xs={12} md={8}>
// // //         <ProductCardLarge product={product} />
// // //       </Grid>
// // //       <Grid item xs={12} md={4}>
// // //         <AddToCart product={product} />
// // //       </Grid>
// // //       <Grid item xs={12}>
// // //         <ReviewAccordion key={refreshKey} productId={id} ref={reviewsAccordionRef} selectedReviewId={selectedReviewId} />
// // //       </Grid>
// // //       {canRate && (
// // //         <Grid item xs={12} md={12} sx={{ flexGrow: 1 }}>
// // //           <AddReviewForm productId={id} userId={user.id} onReviewAdded={refreshReviews} />
// // //         </Grid>
// // //       )}
// // //     </Grid>
// // //   );
// // // }

// // // export default ProductDetailPage;
// // import { useState, useEffect, useRef } from "react";
// // import { useParams } from "react-router-dom";
// // import { getOne } from "../services/ProductService";
// // import { getProductReviews, canUserRate } from "../services/RatingService";
// // import ProductCardLarge from "../components/product/ProductCardLarge";
// // import ReviewCarousel from "../components/review/ReviewCarousel";
// // import ReviewAccordion from "../components/review/ReviewAccordion";
// // import AddReviewForm from "../components/review/AddReviewForm";
// // import AddToCart from "../components/cart/AddToCart";
// // import Grid from "@mui/material/Grid2";
// // import { useAuth } from "../context/AuthContext";

// // function ProductDetailPage() {
// //   const { id } = useParams();
// //   const { user } = useAuth();
// //   const [product, setProduct] = useState(null);
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedReviewId, setSelectedReviewId] = useState(null);
// //   const [canRate, setCanRate] = useState(false);
// //   const reviewsAccordionRef = useRef(null);

// //   // Hämta produkt och recensioner
// //   const fetchProductAndReviews = async () => {
// //     try {
// //       const [prodData, reviewsResponse] = await Promise.all([
// //         getOne(id),
// //         getProductReviews(id)
// //       ]);
// //       setProduct(prodData);
// //       setReviews(reviewsResponse.reviews || []);
// //       if (user) {
// //         canUserRate(id, user.id).then(setCanRate);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching product/reviews:", err);
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     setLoading(true);
// //     fetchProductAndReviews();
// //   }, [id, user]);

// //   const handleReviewClick = (reviewId) => {
// //     setSelectedReviewId(reviewId);
// //     if (reviewsAccordionRef.current) {
// //       reviewsAccordionRef.current.expandAccordion();
// //       setTimeout(() => {
// //         reviewsAccordionRef.current.scrollToReview(reviewId);
// //       }, 300);
// //     }
// //   };

// //   // Callback för att uppdatera recensionerna utan att remountra
// //   const refreshReviews = async () => {
// //     try {
// //       const response = await getProductReviews(id);
// //       setReviews(response.reviews || []);
// //     } catch (err) {
// //       console.error("Error refreshing reviews:", err);
// //     }
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (!product) return <div>Product not found</div>;

// //   return (
// //     <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
// //       <Grid item xs={12}>
// //         <ReviewCarousel reviews={reviews} onReviewClick={handleReviewClick} />
// //       </Grid>
// //       <Grid item xs={12} md={8}>
// //         <ProductCardLarge product={product} />
// //       </Grid>
// //       <Grid item xs={12} md={4}>
// //         <AddToCart product={product} />
// //       </Grid>
// //       <Grid item xs={12}>
// //         <ReviewAccordion
// //           reviews={reviews}
// //           ref={reviewsAccordionRef}
// //           selectedReviewId={selectedReviewId}
// //         />
// //       </Grid>
// //       {canRate && (
// //         <Grid item xs={12}>
// //           <AddReviewForm
// //             productId={id}
// //             userId={user.id}
// //             onReviewAdded={refreshReviews}
// //           />
// //         </Grid>
// //       )}
// //     </Grid>
// //   );
// // }

// // export default ProductDetailPage;
// import { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { getOne } from "../services/ProductService";
// import { getProductReviews, canUserRate } from "../services/RatingService";
// import ProductCardLarge from "../components/product/ProductCardLarge";
// import ReviewCarousel from "../components/review/ReviewCarousel";
// import ReviewAccordion from "../components/review/ReviewAccordion";
// import AddReviewForm from "../components/review/AddReviewForm";
// import AddToCart from "../components/cart/AddToCart";
// import Grid from "@mui/material/Grid2";
// import { useAuth } from "../context/AuthContext";

// function ProductDetailPage() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [canRate, setCanRate] = useState(false);
//   const reviewsAccordionRef = useRef(null);

//   const fetchProductAndReviews = async () => {
//     try {
//       const [prodData, reviewsResponse] = await Promise.all([
//         getOne(id),
//         getProductReviews(id)
//       ]);
//       setProduct(prodData);
//       setReviews(reviewsResponse.reviews || []);
//       if (user) {
//         canUserRate(id, user.id).then(setCanRate);
//       }
//     } catch (err) {
//       console.error("Error fetching product/reviews:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchProductAndReviews();
//   }, [id, user]);

//   // Vid klick på en review i karusellen:
//   const handleReviewClick = (reviewId) => {
//     setSelectedReviewId(reviewId);
//     if (reviewsAccordionRef.current) {
//       reviewsAccordionRef.current.expandAccordion();
//       setTimeout(() => {
//         reviewsAccordionRef.current.scrollToReview(reviewId);
//       }, 300);
//     }
//   };

//   // Uppdatera recensionerna utan att remounta komponenterna
//   const refreshReviews = async () => {
//     try {
//       const response = await getProductReviews(id);
//       setReviews(response.reviews || []);
//     } catch (err) {
//       console.error("Error refreshing reviews:", err);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       <Grid item xs={12}>
//         <ReviewCarousel reviews={reviews} onReviewClick={handleReviewClick} />
//       </Grid>
//       <Grid item xs={12} md={8}>
//         <ProductCardLarge product={product} />
//       </Grid>
//       <Grid item xs={12} md={4}>
//         <AddToCart product={product} />
//       </Grid>
//       <Grid item xs={12}>
//         <ReviewAccordion
//           reviews={reviews}
//           ref={reviewsAccordionRef}
//           selectedReviewId={selectedReviewId}
//         />
//       </Grid>
//       {canRate && (
//         <Grid item xs={12}>
//           <AddReviewForm
//             productId={id}
//             userId={user.id}
//             onReviewAdded={refreshReviews}
//           />
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// export default ProductDetailPage;
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";
import { getProductReviews, canUserRate } from "../services/RatingService";
import ProductCardLarge from "../components/product/ProductCardLarge";
import ReviewCarousel from "../components/review/ReviewCarousel";
import ReviewAccordion from "../components/review/ReviewAccordion";
import AddReviewForm from "../components/review/AddReviewForm";
import AddToCart from "../components/cart/AddToCart";
import Grid from "@mui/material/Grid2";
import { useAuth } from "../context/AuthContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [canRate, setCanRate] = useState(false);
  const reviewsAccordionRef = useRef(null);

  const fetchProductAndReviews = async () => {
    try {
      const [prodData, reviewsResponse] = await Promise.all([
        getOne(id),
        getProductReviews(id)
      ]);
      setProduct(prodData);
      setReviews(reviewsResponse.reviews || []);
      if (user) {
        canUserRate(id, user.id).then(setCanRate);
      }
    } catch (err) {
      console.error("Error fetching product/reviews:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProductAndReviews();
  }, [id, user]);

  const handleReviewClick = (reviewId) => {
    setSelectedReviewId(reviewId);
    if (reviewsAccordionRef.current) {
      reviewsAccordionRef.current.expandAccordion();
      setTimeout(() => {
        reviewsAccordionRef.current.scrollToReview(reviewId);
      }, 300);
    }
  };

  // Callback för att uppdatera recensionerna utan att remounta komponenterna
  const refreshReviews = async () => {
    try {
      const response = await getProductReviews(id);
      setReviews(response.reviews || []);
    } catch (err) {
      console.error("Error refreshing reviews:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Grid item xs={12}>
        <ReviewCarousel reviews={reviews} onReviewClick={handleReviewClick} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ProductCardLarge product={product} />
      </Grid>
      <Grid item xs={12} md={4}>
        <AddToCart product={product} />
      </Grid>
      <Grid item xs={12}>
        <ReviewAccordion
          reviews={reviews}
          ref={reviewsAccordionRef}
          selectedReviewId={selectedReviewId}
        />
      </Grid>
      {canRate && (
        <Grid item xs={12}>
          <AddReviewForm
            productId={id}
            userId={user.id}
            onReviewAdded={refreshReviews}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default ProductDetailPage;
