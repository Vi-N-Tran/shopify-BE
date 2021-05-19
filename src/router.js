import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email, authorName: req.user.authorName });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email, authorName: req.user.authorName });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.put('/user', requireAuth, async (req, res) => {
  try {
    const result = await UserController.updateUser(req.user, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/// your routes will go here
router.route('/posts')
  .post(requireAuth, async (req, res) => {
    try {
      const result = await Posts.createPost(req.user, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .get(async (req, res) => {
    try {
      const result = await Posts.getPosts(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/posts/search')
  .get(async (req, res) => {
    try {
      console.log('got here');
      console.log(req.query);
      const result = await Posts.search(req.query.q);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

router.route('/posts/:id')
  .get(async (req, res) => {
    try {
      const result = await Posts.getPost(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Posts.updatePost(req.user, req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(requireAuth, async (req, res) => {
    try {
      const result = await Posts.deletePost(req.user, req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
