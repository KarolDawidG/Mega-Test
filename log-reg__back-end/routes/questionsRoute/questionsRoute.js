const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { TabelsRecord } = require("../../database/Records/Tabels/TabelsRecord");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");
const {QuestionsRecord} = require("../../database/Records/Questions/QuestionsRecord");

router.use(middleware);

router.get("/:tables", async (req, res, next) => {
  const tables = req.params.tables;

  try {
    const quizzesList = await TabelsRecord.listAll(tables);

    return res.json({ quizzesList });
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

router.post("/:tables", async (req, res) => {
  const tableName = req.params.tables;
  const {  question, optionA, optionB, optionC, correctAnswer } = req.body;


  try {
    const insertId = await TabelsRecord.insertQuestion(tableName, question, optionA, optionB, optionC, correctAnswer);


    return res.status(200).json({ insertId });
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

// router.put("/:tables", async (req, res) => {
//   const tables = req.params.tables;
//   const { question, optionA, optionB, optionC, correctAnswer } = req.body;
//
//   try {
//     await QuizzesRecord.updateRole(
//       question,
//       optionA,
//       optionB,
//       optionC,
//       correctAnswer,
//       tables,
//     );
//     return res.status(200).send("The operation has been successful.");
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send("Unknown server error. Please contact your administrator.");
//   }
// });

router.delete("/:tables/:id", async (req, res, next) => {
  const id = req.params.id;  //TODO id must by uuid!
  const tables = req.params.tables;

  try {
    await QuestionsRecord.delete(tables, id);
    return res.status(200).send("The operation has been successful.");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Unknown server error. Please contact your administrator.");
  }
});

module.exports = router;
