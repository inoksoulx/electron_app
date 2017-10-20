const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Board = require("./app/models/board");

const app = express();
const server = require("http").createServer(app);

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://inok:inok@ds153003.mlab.com:53003/list", {
  useMongoClient: true
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

app.use("/", express.static(__dirname));
app.use(cors(corsOptions));

const router = express.Router();

router.use((req, res, next) => {
  console.log("Something is happen");
  next();
});

router.route("/board/").post((req, res) => {
  var board = new Board();

  board.url = req.body.url;
  board.name = req.body.name;

  board.save(err => {
    if (err) {
      console.log("NO");
      res.send(err);
    } else {
      console.log("OK");
    }
  });
  res.send("Ok");
});

router.route("/board/").get((req, res) => {
  Board.find((err, boards) => {
    if (err) {
      res.send(err);
    }
    res.send(boards);
  });
});

router.route("/board/:url").get((req, res) => {
  Board.find(
    {
      url: req.params.url
    },
    (err, boards) => {
      if (err) res.send(err);

      res.json(boards);
    }
  );
});

router.route("/board/:url").put((req, res) => {
  Board.findById(req.body.board_id, (err, board) => {
    if (err) res.send(err);
    board.lists = req.body.list;
    board.save(err => {
      if (err) res.send(err);
    });
    res.json(board);
  });
});

router.route("/board/list/:url").put((req, res) => {
  Board.findById(req.body.board_id, (err, board) => {
    if (err) res.send(err);
    board.lists.forEach(item => {
      if (item._id == req.body.list_id) {
        item.subtusks = req.body.subtasks;
        res.send(item.subtusks);
      }
    });

    board.save(err => {
      if (err) res.send(err);
    });
  });
});

// router.route("/board/list/:board_id/:list_id").get((req, res) => {
//   Board.findById(req.params.board_id, (err, board) => {
//     if (err) res.send(err);
//     let subs = board.lists.filter(item => {
//       return item._id == req.params.list_id;
//     });

//     res.send(subs);
//   });
// });

router.route("/board/list/sub/:id").put((req, res) => {
  Board.findOne({ 'lists.subtusks._id': req.params.id}, 'lists.subtusks' , (err, board) => {
    if (err) res.send(err);
    board.lists.forEach(item => {
      item.subtusks.forEach(item => {
        if (item._id == req.params.id) {
          item.content = req.body.newVal;
          res.send(item.content);
        }
      })
    })
    board.save(err => {
      if (err) res.send(err);
    });
  });
});

//   .delete((req, res) => {
//     Product.remove({
//       _id: req.params.product_id
//     }, (err, product) => {
//       if(err)
//         res.send(err)
//     })
//   })

app.use("/api", router);

server.listen(app.get("port"), function() {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
