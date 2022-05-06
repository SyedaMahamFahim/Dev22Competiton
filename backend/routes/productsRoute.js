const express = require("express");
const {
  getAdminProducts,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/admin/create-product")
  .post(isAuthenticatedUser, authorizeRoles("admin", "manager"), createProduct);

router
  .route("/admin/all-products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts );

router
  .route("/admin/update-product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "manager"), updateProduct);
router
  .route("/admin/delete-product/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin", "manager"),
    deleteProduct
  );

module.exports = router;

// for user
router.route("/get-all-products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
