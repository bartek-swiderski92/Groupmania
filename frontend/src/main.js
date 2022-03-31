import Post from './components/Post';
import UserProfile from './components/UserProfile';
import './styles/Main.css'

export const apiUrl = `http://localhost:5000/api`;
export const appUrl = `http://localhost:3000/`;
export const api = {
    posts: `${apiUrl}/posts`,
    users: `${apiUrl}/users`,
    likes: `${apiUrl}/likes`,
    comments: `${apiUrl}/comments`,
    readPosts: `${apiUrl}/readPosts`
}
export function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    string = string.charAt(0).toUpperCase() + string.slice(1)
    return string
}

export async function getContent(query) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
}

export function ShowPost({ post, displayLikes, displayComments, reverseComments }) {
    return (
        <>
            {(() => {
                if (Array.isArray(post)) {
                    return post.map((singlePost) => {
                        return <Post key={'post-' + singlePost.id} post={singlePost} user={singlePost.User} displayLikes={true} displayComments={true} reverseComments={true} />
                    }).reverse()
                } else if (post.status === 404) {
                    return <h2 className='error-message'>{post.message}</h2>
                } else {
                    return <Post key={'post-' + post.id} post={post} user={post.User} displayLikes={true} displayComments={true} reverseComments={false} />
                }
            })()}
        </>
    )
}

export function showUser({ user }) {
    return (
        <>
            {(() => {
                if (user.status === 404) {
                    return <h2 className='error-message'>{user.message}</h2>
                } else {
                    return <UserProfile key={'post-' + user.id} user={user.id} />
                }
            })()}
        </>
    )
}

export async function getPosts(query) {
    return await getContent(query)
    .then(items => {
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

export function formatDate(sqlDate, dateOnly) {
    let date = sqlDate.split('T')[0];
    let time = sqlDate.split('T')[1].split('.')[0];
    return (dateOnly === true) ? `${date}` : `${time}, ${date}`
}