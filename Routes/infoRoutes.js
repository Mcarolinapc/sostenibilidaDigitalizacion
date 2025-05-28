import express from 'express';

const router = express.Router();

router.get('/info1', (req, res) => {
  res.render('info1', {
    footerText: req.genericFooter
  });
});

router.get('/info2', (req, res) => {
  res.render('info2', {
    footerText: req.genericFooter
  });
});

router.get('/info3', (req, res) => {
  res.render('info3', {
    footerText: req.genericFooter
  });
});

router.get('/info4', (req, res) => {
  res.render('info4', {
    footerText: req.genericFooter
  });
});

router.get('/info5', (req, res) => {
  res.render('info5', {
    footerText: req.genericFooter
  });
});

router.get('/info6', (req, res) => {
  res.render('info6', {
    footerText: req.genericFooter
  });
});

export default router;
