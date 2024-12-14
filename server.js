const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
