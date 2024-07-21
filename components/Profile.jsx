import EchoCard from "./EchoCard"

const Profile = ({ name, data, handleEdit, handleDelete}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left max-sm:text-[2.5rem]">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to {' '}
        <span className="font-semibold text-teal-500">
          {name}{' '}  
        </span> 
        personalized page.
      </p>
      <div className='mt-10 echo_layout'>
      {data.map((post) => (
        <EchoCard 
          key={post._id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile