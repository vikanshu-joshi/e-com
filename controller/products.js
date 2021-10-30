const ProductModel = require("../models/products");
const HistoryModel = require("../models/product_history");
const UserModel = require("../models/user");

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

const getProduct = async (req, res) => {
    try {
        const id = req.user;
        const pid = req.params.pid;

        if (!pid) {
            return res.send({
                status: 0,
                error: "Product id is required",
                message: "",
                data: "",
            });
        }

        const product = await ProductModel.findById(pid);
        const user = await UserModel.findById(id);
        if (user){
            const history = new HistoryModel({
                product_id:pid
            });
            await history.save();
            await UserModel.findByIdAndUpdate(
                id,
                {
                    $push: { product_history: history._id },
                },
                { new: true, upsert: true }
            );
            res.status(200).send(product);
        }
    } catch (e) {
        res.status(400).send(e.message);
    }

}

const getProductsSearch = async (req, res) => {
    try {
        const search = req.query.search;
        const maxp = req.query.maxp;
        const minp = req.query.minp;
        const maxr = req.query.maxr;
        const minr = req.query.minr;
        const sort = req.query.s;

        const prods = await ProductModel
            .find({
                $and: [
                    {
                        $or: [
                            {product_name: {'$regex': `${search}`, '$options': 'i'}},
                            {product_category_tree: {'$regex': `${search}`, '$options': 'i'}},
                            {brand: {'$regex': `${search}`, '$options': 'i'}}
                        ]
                    },
                    {discounted_price: {$lte: maxp || 1000000000, $gte: minp || 0}},
                    {overall_rating: {$lte: maxr || 5, $gte: minr || 0}},
                ]
            })
            .limit(200)
            .sort({discounted_price: sort})
            .lean();


        res.status(200).send(prods)
    } catch (e) {
        res.status(400).send(e.message);
    }
};
const getCategories = async (req, res) => {
    try {
        let c = []
        const category = req.query.c;
        const maxp = req.query.maxp;
        const minp = req.query.minp;
        const maxr = req.query.maxr;
        const minr = req.query.minr;
        const sort = req.query.s;

        if (typeof category === 'string') {
            c.push(category);
            c.push('');
            c.push('');
        } else {
            c = category;
        }

        const prods = await ProductModel
            .find({
                $and: [
                    {product_category_tree: {'$regex': `${c[0]}`, '$options': 'i'}},
                    {product_category_tree: {'$regex': `${c[1]}`, '$options': 'i'}},
                    {product_category_tree: {'$regex': `${c[2]}`, '$options': 'i'}},
                    {discounted_price: {$lte: maxp || 1000000000, $gte: minp || 0}},
                    {overall_rating: {$lte: maxr || 5, $gte: minr || 0}},
                ]

            })
            .limit(200)
            .sort({discounted_price: sort})
            .lean();

        res.status(200).send(prods)

    } catch (e) {
        res.status(400).send(e.message);
    }

};


module.exports = {
    createProduct,
    getProduct,
    getProductsSearch,
    getCategories
}

