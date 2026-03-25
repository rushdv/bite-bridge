export const ENDPOINTS = {
    // Foods
    FOODS: "/api/foods",
    FEATURED_FOODS: "/api/foods/featured",
    FOOD_BY_ID: (id) => `/api/foods/${id}`,
    MY_FOODS: (email) => `/api/foods/my-foods/${email}`,

    // Requests
    REQUESTS: "/api/requests",
    MY_REQUESTS: (email) => `/api/requests/my-requests/${email}`,
    REQUESTS_BY_FOOD: (foodId) => `/api/requests/food/${foodId}`,
    UPDATE_REQUEST_STATUS: (id) => `/api/requests/${id}/status`,
};
