import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect( () => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (  
        <div>
            <h1>Вы открыли страницу поста с ID {params.id}</h1>
            {isLoading 
                ? <Loader/>
                : <div>{post.title}</div>
            }
            <h2>
                Комментарии
            </h2>
            {isCommentLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm => 
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h3>{comm.email}</h3>
                            <div>{comm.body}</div>
                        </div>
                    )}
                  </div>  
            }
        </div>
    );
}
 
export default PostIdPage;