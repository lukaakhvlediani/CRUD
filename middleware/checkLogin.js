exports.checkLogin = async (req, res) => {
    try {
      const tasks = await Task.find({});
      return res.status(200).send({
        message: "ok",
        data: tasks,
      });
    } catch (error) {
      console.log(error.message, "catch error checklogin");
  
      return res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  };