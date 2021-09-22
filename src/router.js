import { Router } from 'express';
import * as PicController from './controllers/pic_controller';
import * as UserController from './controllers/user_controller';
// import { requireAuth, requireSignin } from './services/passport';
import { requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our shopify BE written by Vi Tran!' });
});

router.post('/signup', async (req, res) => {
  try {
    const token = await UserController.signup(req.body);
    res.json({ token, email: req.body.email, owner: req.body.owner });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signin', requireSignin, async (req, res) => {
  try {
    const token = UserController.signin(req.user);
    res.json({ token, email: req.user.email, owner: req.user.owner });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const result = await UserController.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const result = await UserController.updateUser(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/// your routes will go here
router.post('/pics', async (req, res) => {
  try {
    const result = await PicController.createPic(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/pics/search', async (req, res) => {
  try {
    const result = await PicController.search(req.query.q);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.route('/pics/:id')
  .get(async (req, res) => {
    try {
      const result = await PicController.getPic(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const result = await PicController.updatePic(req.body.newOwnerId, req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await PicController.deletePic(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
