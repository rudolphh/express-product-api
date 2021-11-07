const joinQuery = `
    SELECT p.name, p.description, b.name as brand, c.name as category, p.created_date, p.updated_date 
    FROM product p 
    LEFT JOIN brand b 
    ON p.brand_id = b.id 
    LEFT JOIN category c 
    ON p.category_id = c.id
    WHERE (:brand_id IS NULL OR brand_id = :brand_id)
      AND (:category_id IS NULL OR category_id = :category_id);
`;

const allProducts = async (req, res, next) => {
  const { brand_id, category_id } = req.query;

  try {
    const [results] = await req.db.query(joinQuery, { brand_id, category_id });
    let message;

    if (brand_id) {
        message = results.length > 0
            ? `all products of brand: ${results[0].brand}`
            : `no products for brand id: ${brand_id}`;
    } else if (category_id) {
      message = results.length > 0
          ? `all products of category: ${results[0].category}`
          : `no products for category id: ${category_id}`;
    } else {
      message = "all products";
    }

    res.send({ success: true, message, data: results });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const allProductBrands = async (req, res, next) => {
  try {
    const [results] = await req.db.query(`SELECT * FROM brand`);
    res.send({ success: true, message: "all product brands", data: results });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const allProductCategories = async (req, res, next) => {
  try {
    const [results] = await req.db.query(`SELECT * FROM category`);
    res.send({
      success: true,
      message: "all product categories",
      data: results,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { allProducts, allProductBrands, allProductCategories };
