var express    = require("express"),
	router     = express.Router(),
	quoteModel = require("../libs/mongoose").QuoteModel;

// Loging time and method of quote request
router.use(function timeLog(req, res, next) {
	//console.log('Request method: ', req.method, '; Time: ', Date.now());
	next();
});

// Getting a list of quotes
router.get("/", function (req, res) {
	return quoteModel.find(function (err, quotes) {
        if (!err) {
            return res.send(quotes);
        } else {
            res.statusCode = 500;
            console.log('[Internal error 500]: ', err.message);
            return res.send({ error: 'Internal error 500' });
        }
    }).sort({ date: -1 });
});

// Getting quote by @id
router.get("/:id", function (req, res) {
	return quoteModel.findById(req.params.id, function (err, quote) {
        if(!quote) {
            res.statusCode = 404;
            return res.send({ error: 'Not found 404' });
        }
        if (!err) {
            return res.send({ status: 'OK', quote: quote });
        } else {
            res.statusCode = 500;
            console.log('[Internal error 500]: ', err.message);
            return res.send({ error: 'Internal error 500' });
        }
    });
});

router.post("/", function (req, res) {

	console.log(req.body);

	var quote = new quoteModel({
        content: req.body.content
    });

    quote.save(function (err) {
        if (!err) {
            console.log("quote created");
            return res.send({ status: 'OK', quote: quote });
        } else {
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
                console.log('[Validation error 400]: ', err.message);
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
                console.log('[Internal error 500]: ', err.message);
            }
        }
    });

});

module.exports = router;
