const connection = require('../config/connection');

require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models/ProductImage');
require('../models/ProductOption');
require('../models/ProductCategory');


connection.sync({force: true});