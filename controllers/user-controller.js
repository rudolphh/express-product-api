const { insertRecord } = require("../seeder/seeder");
const insertSql = require("../seeder/insert-record-sql");

const allUsers = async (req, res) => {
  // if the token is valid the middleware allowed us to reach the route
  // and we have access to the userId for queries
  try {
    const [results] = await req.db.query(`SELECT * FROM user`);
    res.send({ success: true, message: "all users", data: results });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
  req.db.release();
};

const allFavorites = async (req, res) => {

  const userId = req.userId;
  try {
    const [results] = await req.db.query(`
            SELECT * FROM user_favorite where user_id = ${userId}`);
    res.send({
      success: true,
      message: `all user (id: ${userId}) favorites`,
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
  req.db.release();
};

const addFavorite = async (req, res) => {
  const userId = req.userId;
  req.body.user_id = userId;
  try {
    const result = await insertRecord(
      req.db,
      insertSql.user_favorite,
      req.body
    );
    if (result.errno === 1062)
      throw new Error("The product is already a favorite of the user");

    res.status(201).send({
      success: true,
      message: `user favorite successfully created`,
      data: { insertId: result },
    });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
  req.db.release();
};

const updateFavoriteNote = async (req, res) => {

  const userId = req.userId;
  const { note } = req.body;
  
  try {
    const [results] = await req.db.query(`
              UPDATE user_favorite SET note = '${note}' 
              WHERE id = ${req.params.id} AND user_id = ${userId};`);

    let message = results.affectedRows 
        ? "User favorite successfully updated"
        : "Product is not a favorite of the user";
        
    res.send({ success: true, message });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
  req.db.release();
};

const deleteFavorite = async (req, res) => {
  
  const userId = req.userId;
  try {
    const [results] = await req.db.query(`
                DELETE FROM user_favorite 
                WHERE id = ${req.params.id} AND user_id = ${userId}`);

    let message = results.affectedRows 
        ? "User favorite successfully deleted"
        : "Product is not a favorite of the user";
        
    res.send({ success: true, message });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
  req.db.release();
};

module.exports = { allUsers, allFavorites, addFavorite, updateFavoriteNote, deleteFavorite };
