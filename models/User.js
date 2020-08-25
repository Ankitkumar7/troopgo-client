const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: Boolean,
  isActive: Boolean,
  role: String,
  online: Boolean,
  reserveSection: {
    type: Boolean,
    default: false,
  },
  statisticalSection: {
    type: Boolean,
    default: false,
  },
  disciplinarySection: {
    type: Boolean,
    default: false,
  },
  monitoringSection: {
    type: Boolean,
    default: false,
  },
  prosecutionSection: {
    type: Boolean,
    default: false,
  },
  operationSection: {
    type: Boolean,
    default: false,
  },
  investigationSection: {
    type: Boolean,
    default: false,
  },
  genralSection: {
    type: Boolean,
    default: false,
  },
  intelligenceSection: {
    type: Boolean,
    default: false,
  },
  confidentialSection: {
    type: Boolean,
    default: false,
  },
  otherSection: {
    type: Boolean,
    default: false,
  },

  snapchat: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  twitch: String,
  quickbooks: String,
  tokens: String,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.username) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.username).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
