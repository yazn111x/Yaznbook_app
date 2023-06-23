import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai"
import { HiOutlineSwitchHorizontal } from "react-icons/hi"
import { BsBarChart, BsTrash, BsChatDots } from "react-icons/bs"
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

function Comment({ comment }) {
    const { data: session } = useSession()
    const [appContext] = useContext(AppContext)
    return (
        <div className="p-3 flex cursor-pointer border-b border-gray-700">
            <img
                src={comment?.userImg}
                alt=""
                className="h-11 w-11 rounded-full mr-4"
            />
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between">
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4 className="font-bold text-[#000000] text-[15px] sm:text-base inline-block group-hover:underline">
                                {comment?.username}
                            </h4>
                            <span className="ml-1.5 text-sm sm:text-[15px]">
                                @{comment?.tag}{" "}
                            </span>
                        </div>{" "}
                        ·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                        </span>
                        <p className="text-[#000000] mt-0.5 max-w-lg text-[15px] sm:text-base">
                            {comment?.comment}
                        </p>
                    </div>
                    <div className="icon group flex-shrink-0">
                        <BiDotsHorizontalRounded className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>

                <div className="text-[#6e767d] flex justify-between w-10/12">
                    <div className="icon group">
                        <BsChatDots className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>

                    <div className="flex items-center space-x-1 group">
                        <div className="icon group-hover:bg-pink-600/10">
                            <AiOutlineHeart className="h-5 group-hover:text-pink-600" />
                        </div>
                        <span className="group-hover:text-pink-600 text-sm"></span>
                    </div>

                    <div className="icon group">
                        <AiOutlineShareAlt className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <BsBarChart className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    {session?.user?.uid !== comment?.id ? (
              <FaRetweet className='hoverEffect w-7 h-7 p-1 cursor-pointer' />
            ) : (
              <RiDeleteBin5Line className='hoverEffect text-[#000] cursor-pointer w-7 h-7 p-1'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "postss", appContext.postId, "comments"));
                }} />
            )}
            
                </div>
            </div>
        </div>
    );
}

export default Comment;