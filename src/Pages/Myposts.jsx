import React,{useState,useEffect} from 'react'
import service from '../appwrite/dataservice'
import {useSelector} from 'react-redux'
import { PostCard ,Container} from '../components'

function Myposts() {
  
  const userData = useSelector((state) => state.auth.UserData);
  const idofuser= userData ? userData.UserData : null;
  const [posts,setposts]=useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Only run if `idofuser` is defined
    if (idofuser) {
        setLoading(true);

        // Fetch posts after delay to ensure `userData` is available
        setTimeout(() => {
            service.getPosts()
                .then((response) => {
                    if (response?.documents) {
                        const userPosts = response.documents.filter(
                            (post) => post.UserId === idofuser.$id
                        );
                        setposts(userPosts);
                    } else {
                        setposts([]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                    setposts([]); // Handle error by setting posts to an empty array
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 500); // Adjust delay time as needed
    }
}, [idofuser]); // Re-run effect when `idofuser` changes

return (
    <div className='w-full py-8'>
        <Container>
            {loading ? (
                <p>Loading posts...</p>
            ) : posts.length > 0 ? (
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </Container>
    </div>
);
}

export default Myposts