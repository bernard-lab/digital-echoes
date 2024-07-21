import Link from 'next/link'

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className='w-full max-w-full flex start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span> 
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and Share your thoughts, stories, and insights by creating an echo. Whether it's a quick update or an in-depth article, your voice matters. Start writing now and let your ideas resonate with our community.
      </p>

      <form 
        onSubmit={handleSubmit}
        className='w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Echo
          </span>
          <textarea 
            className='form_textarea'
            placeholder='Write your echo here...'
            value={post.echo}
            onChange={(e) => setPost({...post, 
              echo: e.target.value })}
            required
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {' '}
            <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
          </span>
          <input 
            className='form_input'
            placeholder='#tag'
            value={post.tag}
            onChange={(e) => setPost({...post, 
              tag: e.target.value })}
            required
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
              <Link href='/' className='text-gray-500 text-sm'>
                Cancel
              </Link>
              <button 
                type='submit' 
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
              >
                {submitting ? `${type}...` : type}
              </button>
        </div>
      </form>
    </section>
  )
}

export default Form;