import React,{useState,useEffect} from 'react'
import service from '../appwrite/dataservice'
import {useSelector} from 'react-redux'
import { PostCard ,Container} from '../components'

function Myposts() {
  
  const userData = useSelector((state) => state.auth.UserData);
  const idofuser= userData ? userData.UserData : null;
  const [posts,setposts]=useState([]);
  useEffect(() => {
    if (!idofuser) return; // Exit early if user data is not available

    service.getPosts().then((response) => {
        if (response && response.documents) {
            // Filter posts by the user's ID
            const userPosts = response.documents.filter((res) => res.UserId === idofuser.$id);
            setposts(userPosts);
        }
    }).catch(error => {
        console.error("Error fetching posts:", error);
    });
  }, [idofuser]); 
    

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
            </div>
        </Container>
    </div>
  )
}

export default Myposts