import React,{useState,useEffect} from 'react'
import {Container, PostCard} from '../components'
import service from '../appwrite/dataservice'
import blog from '../../src/assets/home1.jpeg'
import {useSelector} from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-0 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            
                            <div className="flex flex-wrap items-center p-2">
  
                              <div className="p-2 w-full md:w-1/2 flex justify-center">
                              <img 
                                src={blog}
                                alt="Blog Image" 
                                style={{ 
                                  width: '100%',       
                                  maxWidth: '800px',    
                                  height: 'auto',       
                                  marginTop: '20px'     
                                }} 
                              />
                              </div>

                              {/* Text Section */}
                              <div className="p-2 w-full md:w-1/2 flex flex-col space-y-4">
                                <h1 className="text-4xl font-bold text-gray-800">Welcome to VerseHub – Your Portal to Insightful Stories and Knowledge!</h1>
                                <p className="text-lg text-gray-700">
                                  Dive into a world of ideas, inspiration, and information. Whether you’re here to explore, learn, or simply relax with a good read, our collection of blogs covers a wide range of topics crafted to spark curiosity and engage minds.Plus, if you have a story to share, you can publish your own blogs here too!
                                </p>
                              </div>
                            </div>
                            <h1 className="text-2xl font-bold hover:text-gray-500 mt-12">
                               {authStatus? "You can add your Blog":"Login to read Blogs"}
                            </h1>
                        </div>
                        
                    </div>
                </Container>
            </div>
        )
    }
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

export default Home