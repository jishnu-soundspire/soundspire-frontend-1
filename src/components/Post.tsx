'use client';
import { FaRegHeart, FaRegPaperPlane, FaRegComments, FaHeart } from 'react-icons/fa6';
import { useState } from 'react';

export default function Post(){

    const [showComments,setShowComments]=useState<Boolean>(false);
    const [liked,setLiked]=useState<Boolean>(false);

    return(
        <div className='post rounded-xl bg-white w-[80%] mb-10'>
                        <div className='post-header flex items-center p-5'>
                            <img
                                src="/images/placeholder.jpg"
                                alt={`Avatar`}
                                className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <h1 className='font-bold'>ArtistName</h1>
                        </div>
                        <div className='post-body mb-2'>
                            <img
                                src="/images/placeholder.jpg"
                                alt={`Avatar`}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className='post-interactions flex pl-4 py-5 text-lg'>
                            <div className='flex items-center mr-4'>
                                { !liked ? 
                                <FaRegHeart className='mr-3 cursor-pointer' onClick={()=> setLiked(!liked)}/> :
                                <FaHeart className='mr-3 cursor-pointer fill-rose-400' onClick={()=> setLiked(!liked)}/>
                                }
                                <p>Like</p>
                            </div>
                            <div className='flex items-center mr-4'>
                                <FaRegComments className='mr-3'/>
                                <p>Comment</p>
                            </div>
                            <div className='flex items-center mr-4'>
                                <FaRegPaperPlane className='mr-3'/>
                                <p>Share</p>
                            </div>
                        </div>
                        <div className='post-details flex px-5 pb-5 flex-wrap'>
                            <p><span className='font-bold mr-3'>ArtistName</span>This is the post caption, this sentence was added just to increase size. Caption can be as long as you want it to be, just testing the wrap</p>
                        </div>
                        { showComments ? 
                        <div className='post-comments-preview p-4'>
                            <div className='post-comment flex items-center py-2'>
                                <img
                                src="/images/placeholder.jpg"
                                alt={`Avatar`}
                                className="w-12 h-12 rounded-full object-cover mr-5"
                                />
                                <div>
                                    <input placeholder='Enter Comment...' className='border-b-black border-b-2 w-[35vw] p-2 focus:outline-none'></input>
                                </div>
                                
                            </div>

                            <div className='post-comment flex items-center py-2'>
                                <img
                                src="/images/placeholder.jpg"
                                alt={`Avatar`}
                                className="w-12 h-12 rounded-full object-cover mr-5"
                                />
                                <div>
                                    <h1>Commenter Name</h1>
                                    <h1>This is a comment preview, Just a test for a longer comment haha</h1>
                                    <div className='flex'>
                                        <div className='flex items-center mr-4'>
                                            <FaRegHeart className='mr-1'/>
                                            <p className='comment-like-count'>14</p>
                                        </div>
                                        <div className='flex items-center mr-4'>
                                            <p className='font-semibold'>Reply</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='post-comment flex items-center py-2'>
                                <img
                                src="/images/placeholder.jpg"
                                alt={`Avatar`}
                                className="w-12 h-12 rounded-full object-cover mr-5"
                                />
                                <div>
                                    <h1>Commenter Name</h1>
                                    <h1>This is a comment preview, Just a test for a longer comment haha</h1>
                                    <div className='flex'>
                                        <div className='flex items-center mr-4'>
                                            <FaRegHeart className='mr-1'/>
                                            <p className='comment-like-count'>14</p>
                                        </div>
                                        <div className='flex items-center mr-4'>
                                            <p className='font-semibold'>Reply</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div> : null }
        </div>
    )
}