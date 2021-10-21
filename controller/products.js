const ProductModel = require("../models/products");

const createProduct = async (req, res) => {

    const prod = new ProductModel({
        product_name: req.body.product_name,
        product_category_tree: req.body.product_category_tree,
        retail_price: req.body.retail_price,
        discounted_price: req.body.discounted_price,
        image: req.body.image,
        product_rating: req.body.product_rating,
        overall_rating: req.body.overall_rating,
        brand: req.body.brand
    })
    try {

        const savedprod = await prod.save();
        console.log(savedprod);
        res.send(savedprod);

    } catch (e) {
        res.status(400).send(e.message)
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send(products);
    } catch (e) {
        res.status(400).send(e.message);
    }

}

const getProductsSearch = async (req, res) => {
    try {
        const {search} = req.query

        const prods = await ProductModel
                                .find({
                                    $or: [{product_name: {'$regex': search, '$options': 'i'}}, {
                                        product_category_tree: {
                                            '$regex': search,
                                            '$options': 'i'
                                        }
                                    }, {brand: {'$regex': search, '$options': 'i'}}]
                                }, {score: {'$meta': 'textscore'}})
                                .sort({
                                    score: {'$meta': 'textScore'}
                                });


        res.status(200).send(prods)
    } catch (e) {
        res.status(400).send(e.message);
    }
};
const getCategories = async (req, res) => {
    try {
        const {category} = req.query;
        // ProductModel.ensureIndexes({product_category_tree:'text'})
        // const prods = await ProductModel
        //     .find({ $text:{$search:category, $caseSensitive:false}
        //
        //     }, {score: {$meta: 'textscore'}})
        //     .sort({
        //         score: {$meta: 'textscore'}
        //     })
        const prods = await ProductModel
                                .find({
                                    product_category_tree: {
                                        '$regex': category,
                                        '$options': 'i'
                                    }
                                }, {score: {$meta: 'textscore'}})
                                .sort({
                                    score: {$meta: 'textScore'}
                                })

        res.status(200).send(prods)

    } catch (e) {
        res.status(400).send(e.message);
    }

};


module.exports = {
    createProduct,
    getProducts,
    getProductsSearch,
    getCategories
}

