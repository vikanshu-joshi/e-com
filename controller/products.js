const ProductModel = require("../models/products");
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
        brand: req.body.brand,
    });
    try {
        const savedprod = await prod.save();
        console.log(savedprod);
        res.send(savedprod);
    } catch (e) {
        res.status(400).send(e.message);
    }
};

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

        if (user) {
            let r = user.product_history.find(i => (i.toString()) === pid)
            if (r) {
                res.status(200).send({
                    status: 1,
                    error: "",
                    message: "Product already in list.",
                    data: product,
                });
            } else {
                await UserModel.findByIdAndUpdate(
                    id,
                    {
                        $push: {product_history: pid},
                    },
                    {new: true, upsert: true}
                );

                res.status(200).send({
                    status: 1,
                    error: "",
                    message: "Product added in list.",
                    data: product,
                });
            }
        }

    } catch (e) {
        res.status(400).send({
            status: 0,
            error: e.message,
            message: "ERROR",
            data: "",
        });
    }
};

const bySearch = async (req, res) => {
    const perPage = 8;
    try {
        let minp,minr,maxp,maxr;

        const search = req.query.search;
        const priceRange = req.query.priceR
        const ratingRange = req.query.ratingR
        const s = req.query.s==='undefined'?{}:req.query.s;
        const page = req.query.page;
        if(priceRange) {
             [minp, maxp] = priceRange.split("-");
        }
        if(ratingRange) {
             [minr, maxr] = ratingRange.split("-");
        }

        let sort;
        if (s === "pAsc") {
            sort = {discounted_price: 1};
        } else if (s === "pDesc") {
            sort = {discounted_price: -1};
        } else if (s === "rateRank") {
            sort = {overall_rating: -1};
        }else sort=s;

        const filters={
            $and:[
                {
                $or:[
                    CreateSearchMongoQuery('product_name',search),
                    CreateSearchMongoQuery('product_category_tree',search),
                    CreateSearchMongoQuery('brand',search)
                ],
            },
                CreateRangeMongoQuery('discounted_price',minp,maxp,10000000),
                CreateRangeMongoQuery('overall_rating',minr,maxr,5),
            ].filter(q => q !== null)
        }

        const count = await ProductModel.countDocuments(filters);
        const prods = await ProductModel.find(filters)
            .skip(page * perPage)
            .limit(perPage)
            .sort(sort)
            .lean();

        res.status(200).send({
            status: 1,
            error: "",
            message: filters,
            data: {
                count: count,
                results: prods,
                prev: page > 1 ? page - 1 : null,
                next: page * perPage < count ? page + 1 : null,
            },
        });
    } catch (e) {
        res.status(400).send({
            status: 0,
            error: e.message,
            message: "ERROR",
            data: {}
        })    }
};

const byCategory = async (req, res) => {
    const perPage = 8;
    try {
        let minp,minr,maxp,maxr;
        const category = req.query.c;
        const priceRange = req.query.priceR
        const ratingRange = req.query.ratingR
        const s = req.query.s==='undefined'?{}:req.query.s;
        const page = req.query.page;
        if(priceRange) {
             [minp, maxp] = priceRange.split("-");
        }
        if(ratingRange) {
             [minr, maxr] = ratingRange.split("-");
        }

        let c = category.split('-');

        let sort;
        if (s === "pAsc") {
            sort = {discounted_price: 1};
        } else if (s === "pDesc") {
            sort = {discounted_price: -1};
        } else if (s === "rateRank") {
            sort = {overall_rating: -1};
        }else sort=s;

        const filters={
            $and:[
                CreateSearchMongoQuery('product_category_tree',c[0]),
                CreateSearchMongoQuery('product_category_tree',c[1]),
                CreateSearchMongoQuery('product_category_tree',c[2]),
                CreateRangeMongoQuery('discounted_price',minp,maxp,10000000),
                CreateRangeMongoQuery('overall_rating',minr,maxr,5),
            ].filter(q => q !== null)
        }

        const count = await ProductModel.countDocuments(filters);

        const prods = await ProductModel.find(filters)
            .skip(page * perPage)
            .limit(perPage)
            .sort(sort)
            .lean();

        res.status(200).send({
            status: 1,
            error: "",
            message: filters,
            data: {
                count: count,
                results: prods,
                prev: page > 1 ? page - 1 : null,
                next: page * perPage < count ? page + 1 : null,
            },
        });
    } catch (e) {
        res.status(400).send({
            status: 0,
            error: e.message,
            message: "ERROR",
            data: {}
        })
    }
};

function CreateSearchMongoQuery(prop,value){
    return value === undefined ? null : {[prop]: {$regex: `${value}`, $options: "i"}};
}
function CreateRangeMongoQuery(prop,minvalue,maxvalue,defaultMax) {
    if (minvalue === undefined && maxvalue === undefined) {
        return null;
    } else {
        return {[prop]: {$lte: parseInt([maxvalue], 10)||defaultMax, $gte: parseInt([minvalue], 10)||0}}
    }

}

module.exports = {
    createProduct,
    getProduct,
    bySearch,
    byCategory,
};
