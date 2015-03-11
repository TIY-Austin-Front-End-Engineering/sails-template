/**
 * UploadControllerController
 *
 * @description :: Server-side logic for managing Uploadcontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var skipperS3 = require('skipper-s3');

module.exports = {
	index: function(req, res) {
		req.file('file').upload({
			adapter: skipperS3,
			key: sails.config.s3.key,
			secret: sails.config.s3.secret,
			bucket: sails.config.s3.bucket,
			region: sails.config.s3.region
		}, function(err, uploadedFiles) {
			if(err) {
				res.status(500);
				res.jsonx({
					"error": "E_NOTFOUND",
					"status": 404,
					"summary": "No user is logged in."
				});
			}
			
			return res.jsonx(uploadedFiles);
		});
	}
};

