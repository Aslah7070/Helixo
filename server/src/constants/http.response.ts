export const HttpResponse = {
  // ✅ Authentication
  LOGIN_SUCCESS: "Login successful.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  UNAUTHORIZED_ACCESS: "Unauthorized access. Please log in again.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  TOKEN_MISSING: "Authentication token missing.",
  TOKEN_INVALID: "Invalid or expired token.",

  // 👤 User Management
  USER_ALREADY_EXISTS: "User already exists with this email.",
  USER_CREATED: "User registered successfully.",
  USER_NOT_FOUND: "User not found.",

  // 📦 Product Management
  PRODUCT_CREATED: "Product added successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",
  PRODUCT_NOT_FOUND: "Product not found.",
  PRODUCT_FETCH_SUCCESS: "Products fetched successfully.",

  // 📊 Analytics
  STATS_FETCH_SUCCESS: "Dashboard statistics fetched successfully.",

  // ⚠️ Errors & Server
  BAD_REQUEST: "Invalid request data.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  NOT_FOUND: "Requested resource not found.",
};
