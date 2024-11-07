import React,{useState,useEffect} from 'react'
import service from '../appwrite/dataservice'
import {useSelector} from 'react-redux'
import { PostCard ,Container} from '../components'

function Myposts() {
  
  const userData = useSelector((state) => state.auth.UserData);
  const idofuser= userData.UserData;
  const [posts,setposts]=useState([]);
  let arry = []

    useEffect(() => {
        service.getPosts().then((response) => {
            if (response) {
                const data = response.documents;
                data.map((res)=> {
                  if(res.UserId===idofuser.$id)
                  {
                    arry.push(res);
                  }
                })
                setposts(arry);
            }
        })
    }, [])
    

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