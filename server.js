let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer();
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let reloadMagic = require("./reload-magic.js");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
reloadMagic(app);

// Eventually need to import multer for user images
app.use("/", express.static("build"));
app.use("/", express.static("public")); // Needed for local assets
let url =
  "mongodb+srv://bob:bobsue@cluster0-osjlq.mongodb.net/test?retryWrites=true&w=majority";
let dbo = undefined;
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("GymGo");
});
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};
// Endpoints go after this line
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let email = req.body.email;
  let pwd = req.body.password;
  dbo.collection("users").findOne({ email }, (err, user) => {
    if (err) {
      console.log("/login error", err);
      res.json({ success: false });
      return;
    }
    if (!user) {
      res.json({ success: false });
      return;
    }
    if (user.password === pwd) {
      if (user.sessionId) {
        res.cookie("sid", user.sessionId);
        res.json({ success: true });
        return;
      }
    }
    if (!user.sessionId) {
      let sessionId = generateId();
      console.log("generated id", sessionId);
      dbo
        .collection("users")
        .updateOne(
          { email },
          { $set: { sessionId: sessionId } },
          (err, user) => {
            if (err) {
              console.log("cookie generation error", err);
              res.json({ success: false });
              return;
            }
            res.cookie("sid", user.sessionId);
            // res.json({ success: true });
            return;
          }
        );

      res.json({ success: true });
      return;
    }
    res.json({ success: false });
  });
});

app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body);
  let email = req.body.email;
  let pwd = req.body.password;

  console.log("password", pwd);
  dbo.collection("users").findOne({ email }, (err, user) => {
    console.log(user);
    if (err) {
      console.log("/signup error", err);
      res.json({ success: false });
      return;
    }
    if (!user) {
      dbo
        .collection("users")
        .insertOne({ email, password: pwd, profileComplete: false });
      res.json({ success: true });
      return;
    } else {
      res.json({ success: false, message: "Username already exists!" });
      return;
    }
  });
});

app.post("/profileComplete", upload.none(), (req, res) => {
  console.log("updating profile", req.body);
  let sid = req.cookies.sid;
  console.log(req.cookies.sid);
  // let body = JSON.parse(req.body);
  let fName = req.body.firstName;
  let lName = req.body.lastName;
  let availabilitiesSchedule = JSON.parse(req.body.availabilitiesSchedule);
  let availabilitiesTime = JSON.parse(req.body.availabilitiesTime);
  let profileGoals = JSON.parse(req.body.profileGoals);
  let profileExp = JSON.parse(req.body.profileExp);
  let profileComplete = req.body.profileComplete;
  let obj = {
    fName,
    lName,
    availabilitiesSchedule,
    availabilitiesTime,
    profileGoals,
    profileExp,
    profileComplete
  };
  dbo
    .collection("users")
    .updateOne({ sessionId: sid }, { $set: { userProfile: obj } });
  res.send("success");
});
app.post("/logout", upload.none(), (req, res) => {
  res.send(JSON.stringify({ success: false }));
});

app.get("/userInfo", (req, res) => {
  let sid = req.cookies.sid;
  dbo.collection("users").find({ sessionId: sid }, (err, user) => {
    if (err) {
      console.log("/signup error", err);
      res.json({ success: false });
      return;
    }
    if (user) {
      res.json({ userProfile: user.userProfile });
      return;
    }
  });
});
app.get("/searchResults", (req, res) => {
  let sid = req.cookies.sid;
  dbo
    .collection("users")
    .find({})
    .toArray(err, users => {
      // let mySchedule = dbo.collection("users").find({sid})
      //  let compatibleUsers = users.filter(user=>{
      //   if(
      //     user.schedule.monday === mySchedule.monday ||
      //     user.schedule.tuesday === mySchedule.tuesday
      //     )
      //     return user
      res.send(JSON.stringify(users[userProfile].fName));
    });
  // res.send(JSON.stringify({compatibleUsers: compatibleUsers}))
  // })
});

// Endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
