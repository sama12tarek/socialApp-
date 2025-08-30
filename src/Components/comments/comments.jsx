
 export const Comments = ({ comment }) => {

  let { commentCreator, createdAt, content } = comment;
  return (
    <div className="w-full rounded-md border-2 border-slate-500 text-black">
    <div className='flex iteams-center justify-between'>
      <div className='flex gap-3 items-center'>
          <img src={commentCreator.photo} alt="" />
          <h3>{commentCreator.name}</h3>
      </div>
      <span>{createdAt}</span>
    </div>
    <div className="content">
    content:  {content}
    </div>
    </div>

  );
};

export default Comments;
