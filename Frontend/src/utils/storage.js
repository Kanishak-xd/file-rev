// LocalStorage utilities for managing file review data

const STORAGE_KEYS = {
  REQUESTS: 'file_review_requests',
  REVIEWS: 'file_review_reviews'
};

// Request structure: { id, files: [{ name, type, data, preview }], status: 'pending', createdAt }
// Review structure: { requestId, files: [{ name, status: 'approved'|'rejected', comment }], reviewedAt }

export const storage = {
  // Get all pending requests
  getRequests: () => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  },

  // Save a new request
  saveRequest: (request) => {
    const requests = storage.getRequests();
    requests.push(request);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },

  // Remove a request (after review)
  removeRequest: (requestId) => {
    const requests = storage.getRequests();
    const filtered = requests.filter(r => r.id !== requestId);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(filtered));
  },

  // Get all reviews
  getReviews: () => {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  },

  // Save a review
  saveReview: (review) => {
    const reviews = storage.getReviews();
    reviews.push(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  },

  // Get all data for report generation
  getAllData: () => {
    return {
      requests: storage.getRequests(),
      reviews: storage.getReviews()
    };
  }
};

