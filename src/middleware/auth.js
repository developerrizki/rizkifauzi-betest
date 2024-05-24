const requireAuth = (req, res, next) => {
  const auth = res.locals.user
  if (!auth) {
    return res.status(403).json({ message: 'Access forbidden' })
  }

  return next()
}

module.exports = requireAuth