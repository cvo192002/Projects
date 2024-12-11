
const API_URL = 'http://localhost:3000/api/recipes';

export const getRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error('Fetching recipes failed: ', e);
    return []; 
  }
};

export const getRecipe = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Fetching recipe with id ${_id} failed: `, e);
  }
};


export const createRecipe = async (recipeData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });

    if (response.status === 201) {
      const newRecipe = await response.json();
      return newRecipe;
    } else if (response.status === 400) {
      // The server is indicating there is something wrong with the request
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    } else {
      // Handle other statuses appropriately or throw a general error
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Creating recipe failed:', error);
    throw error; // Re-throw the error to be handled by the calling component.
  }
};



export const updateRecipe = async (_id, recipeData) => {
  try {
   
    const response = await fetch(`${API_URL}/${_id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Updating recipe with id ${_id} failed: `, e);
  }
};

export const deleteRecipe = async (_id) => {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); 
  } catch (e) {
    console.error(`Deleting recipe with id ${_id} failed: `, e);
  }
};


//review functions
export const createReview = async (recipeId, reviewData) => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
   
      },
      body: JSON.stringify({
        description: reviewData.description,
        rating: reviewData.rating,
        user: reviewData.user
      }),
    });

    if (!response.ok) {
    
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    
    console.error("Error creating review:", error);
    throw error; 
  }
};


export const getReviews = async (recipeId) => {
    try {
      const response = await fetch(`${API_URL}/${recipeId}/reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers like authorization if needed
        }
      });
  
      if (!response.ok) {
        // If the server response is not ok, throw an error
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // If everything went well, parse the response body as JSON
      return await response.json();
    } catch (error) {
      // If there's an error in the request, log it or handle it as needed
      console.error("Error fetching reviews:", error);
      throw error; // You can throw the error to handle it in the calling component
    }
  };
  

export const updateReview = async (recipeId, reviewId, reviewData) => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Updating review with id ${reviewId} failed: `, e);
    throw e; // Re-throw the error to be handled by the calling component
  }
};

export const deleteReview = async (recipeId, reviewId) => {
  try {
    const response = await fetch(`${API_URL}/${recipeId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Deleting review with id ${reviewId} failed: `, e);
    throw e; // Re-throw the error to be handled by the calling component
  }
};


