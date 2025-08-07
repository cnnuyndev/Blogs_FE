import api from "@/api";

export const fetchPosts = async (page) => {
  try {
    const response = await api.get(`/api/blog_list/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export async function getBlog(slug) {
  try {
    const response = await api.get(`/api/blogs/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export const registerUser = async (data) => {
  try {
    const response = await api.post("api/register_user/", data);
    return response.data;
  } catch (error) {
    if (error.status === 400) {
      throw new Error("User already exists");
    }
    throw new Error(error.message);
  }
};

export const SignIn = async (token) => {
  try {
    const response = await api.post("api/token/", token);
    return response.data;
  } catch (error) {
    if (error.status === 401) {
      throw new Error("Invalid Credentials");
    }
    throw new Error(error.message);
  }
};

export const getInforUser = async (username) => {
  try {
    const response = await api.get(`api/get_userinfo/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function getUsername() {
  try {
    const response = await api.get("api/get_username/");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateProfile(data) {
  try {
    const response = await api.put(`api/update_user/`, data);
    return response.data;
  } catch (err) {
    console.log(err);
    if (err.response) {
      throw new Error(
        err?.response?.data.username[0] || "Failed to update profile"
      );
    }

    throw new Error(err.message);
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("api/create_blog/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBlog(data, id) {
  try {
    const response = await api.put(`api/update_blog/${id}/`, data);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to update blog");
    }

    throw new Error(err.message);
  }
}

export async function deleteBlog(id) {
  try {
    const response = await api.post(`api/delete_blog/${id}/`);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to delete blog");
    }

    throw new Error(err.message);
  }
}
