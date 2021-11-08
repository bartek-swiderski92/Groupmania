import Post from './components/Post';
import './styles/Main.css'
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

export function ShowPost({ post }) {
    return (
        <>
            {(() => {
                if (Array.isArray(post)) {
                    return post.map((singlePost) => {
                        return <Post key={'post-' + singlePost.id} post={singlePost} user={singlePost.UserId} />
                    })
                } else if (post.status === 404) {
                    return <h2 className='error-message'>{post.message}</h2>
                } else {
                    return <Post key={'post-' + post.id} post={post} user={post.UserId} />
                }
            })()}
        </>
    )
}

export async function getPosts(query) {
    // let Posts = []
    return await getContent(query).then(items => {
        console.log(items);
        return items
    }).catch((error) => {
        console.log(error);
    })
}

export async function getUserDetails(query) {
    // let Posts = []
    return await getContent(query).then(item => {
        return item
    }).catch((error) => {
        console.log(error);
    })
}
    // const [users, setUsers] = useState([]);

// async function getPosts(query) {
//     // let Posts = []
//     return await getContent(query).then(items => {
//         console.log(items);
//         return [...items]
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// function ShowPost({ post }) {
//     return (
//         <div>
//             {
//                 post.map((singlePost) => {
//                     return <Post post={singlePost} />
//                 })
//             }
//         </div>
//     )
// }

// export function getUserDetails(user) {
//     // const [users, setUsers] = useState([]);
//     getContent(api.users + '/' + user).then((user) => {
//         return user

//     }).catch((error) => {
//         console.log(error)
//     })

// }