var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    firstName : { type: 'string', required: true },
    lastName : { type: 'string', required: true },
    address : { type: 'string', required: true },
    city : { type: 'string', required: true },
    state : { type: 'string', required: true },
    zip : { type: 'string', required: true }
  }
};

module.exports = User;
