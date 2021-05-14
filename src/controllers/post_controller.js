import Post from '../models/post_model';

export const createPost = async (postFields) => {
  // await creating a post
  // return post
  try {
    const post = new Post();
    post.title = postFields.title;
    const savedpost = await post.save();
    if (savedpost) return savedpost;
    else return new Error('Can\'t create a post');
  } catch (error) {
    console.log(error);

    throw new Error(`create post error: ${error}`);
  }
};

export const getPosts = async () => {
  // await finding posts
  // return posts
  try {
    const posts = await Post.find({});
    if (posts) return posts;
    else return new Error('Can\'t find posts');
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
};
export const getPost = async (id) => {
  console.log(id);
  // await finding one post
  // return post
  try {
    const posts = await Post.findOne({ _id: id });
    if (posts) return posts;
    else return new Error(`Can not find ${id} post`);
  } catch (error) {
    throw new Error(`get one post error: ${error}`);
  }
};
export const deletePost = async (id) => {
  // await deleting a post
  // return confirmation
  try {
    const posts = await Post.deleteOne({ _id: id });
    if (posts) return posts;
    else return new Error(`Can not delete ${id} post`);
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};
export const updatePost = async (id, postFields) => {
  // await updating a post by id
  // return *updated* post
  try {
    const posts = await Post.updateOne({ _id: id, title: postFields.title });
    if (posts) return posts;
    else return new Error(`Can not update ${id} post`);
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
};
