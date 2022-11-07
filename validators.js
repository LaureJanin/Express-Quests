const Joi = require("joi");

// Validation manuelle pour vérifier les requêtes liées à la table movies

const validateMovie = (req, res, next) => {
    // validate req.body then call next() if everything is ok
    const { title, director, year, color, duration } = req.body;
    const errors = [];
  if (title == null) {
    errors.push({field: 'title', message: 'title is required'});
  } 
  else if (title.length >= 255) {
    errors.push({ field: 'title', message: 'Should contain less than 255 characters' });
  } 
  if (director == null) {
    errors.push({field: 'director', message: 'director is required'});
  } 
  if (year == null) {
    errors.push({field: 'year', message: 'year is required'});
  } 
  if (color == null) {
    errors.push({field: 'color', message: 'color is required'});
  } 
  if (duration == null) {
    errors.push({field: 'duration', message: 'duration is required'});
  } 
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
   } else {
    next();
  }
  };

//   Validation via le package JOI pour vérifier les requêtes liées à la table Users

  const userSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
  });
    
const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;
  
    const { error } = userSchema.validate(
      { firstname, lastname, email },
      { abortEarly: false }
    );
  
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      next();
    }
  };
  
  module.exports = {
    validateMovie,
    validateUser,
  };