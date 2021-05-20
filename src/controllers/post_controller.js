import Post from '../models/post_model';

export const createPost = async (user, postFields) => {
  // await creating a post
  // return post
  try {
    const post = new Post();
    post.cost = postFields.cost;
    post.images = postFields.images;
    post.location = postFields.location;
    post.availableRoom = postFields.availableRoom;
    post.commonSpace = postFields.commonSpace;
    post.area = postFields.area;
    post.description = postFields.description;
    post.closeTo = postFields.closeTo;
    post.author = user._id;
    post.authorName = user.authorName;
    const savedpost = await post.save();
    if (savedpost) return savedpost;
    else return new Error('Can\'t create a post');
  } catch (error) {
    throw new Error(`create post error: ${error}`);
  }
};

export const getPosts = async () => {
  // await finding posts
  // return posts
  try {
    const posts = await Post.find({}).populate('author');
    if (posts) return posts;
    else return new Error('Can\'t find posts');
  } catch (error) {
    throw new Error(`get posts error: ${error}`);
  }
};
export const getPost = async (id) => {
  // await finding one post
  // return post
  try {
    const posts = await Post.findById({ _id: id }).populate('author');
    if (posts) return posts;
    else return new Error(`Can not find ${id} post`);
  } catch (error) {
    throw new Error(`get one post error: ${error}`);
  }
};

export const deletePost = async (user, id) => {
  // await deleting a post
  // return confirmation
  try {
    const post = await Post.findById({ _id: id });
    if (post.authorName === user.authorName) {
      const posts = await Post.remove({ _id: id });
      if (posts) return posts;
      else return new Error(`Can not delete ${id} post`);
    } else return new Error(`Can not delete ${id} post`);
  } catch (error) {
    throw new Error(`delete post error: ${error}`);
  }
};
export const updatePost = async (user, id, postFields) => {
  // await updating a post by id
  // return *updated* post
  try {
    const post = await Post.findById({ _id: id }).populate('author');
    if (post.author.authorName === user.authorName) {
      await Post.findByIdAndUpdate(id, {
        cost: postFields.cost,
        images: postFields.images,
        location: postFields.location,
        availableRoom: postFields.availableRoom,
        commonSpace: postFields.commonSpace,
        area: postFields.area,
        description: postFields.description,
        closeTo: postFields.closeTo,
        author: post.author.id,
      }, { new: true });
      const returnPost = await Post.findById({ _id: id });
      if (returnPost) return returnPost;
      else return new Error(`Can not update ${id} post`);
    } else return new Error(`Can not update ${id} post`);
  } catch (error) {
    throw new Error(`update post error: ${error}`);
  }
};

export const search = async (term) => {
  return Post.find({
    location: {
      $regex: `.*${term}.*`,
    },
  });
};
