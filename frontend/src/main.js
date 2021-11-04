const apiUrl = `http://localhost:5000/api`;

// export const postsApi = `${api}/posts`;
// export const usersApi = `${api}/users`;
// export const likeApi = `${api}/like`;
// export const commentApi = `${api}/comment`;
// export const readPost = `${api}/readPost`;

export const api = {
    posts: `${apiUrl}/posts`,
    users: `${apiUrl}/users`,
    likes: `${apiUrl}/likes`,
    comments: `${apiUrl}/comments`,
    readPosts: `${apiUrl}/readPosts`
}

export async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}
