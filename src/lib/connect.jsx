import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  arrayUnion,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

//   import toast from "react-hot-toast";

const services = {
  setUserById: async (user) => {
    const usersref = doc(db, "Users", user.id);

    try {
      await setDoc(usersref, user, { merge: true });
    } catch (err) {
      return "something went wrong";
    }
  },
  getUserById: async (id) => {
    const usersref = doc(db, "Users", id);

    try {
      const user = await getDoc(usersref);

      return user.data();
    } catch (err) {
      return "something went wrong";
    }
  },
  setQuizs: async (userid, param, Details) => {
    const quizref = collection(db, "Quiz");
    try {
      let quiz;
      await fetch(`https://opentdb.com/api.php?${param}`)
        .then(function (response) {
          return response.json();
        })
        .then((data) => (quiz = data));
      console.log(quiz);

      if (quiz.response_code == 0) {
        function formatQuiz(q, i) {
          const options = q.incorrect_answers;

          options.splice(
            ((options.length + 1) * Math.random()) | 0,
            0,
            q.correct_answer
          );

          return {
            qno: i + 1,
            type: q.type,
            answers: options,
            question: q.question,
            difficulty: q.difficulty,
            correct_answer: q.correct_answer,
            category: q.category,
          };
        }

        // formatQuiz(quiz.results[qNo - 1]);
        const formatedQuiz = quiz.results.map((q, i) => formatQuiz(q, i));

        const res = await addDoc(quizref, {
          results: formatedQuiz,
          details: Details,
          noOfUsers: 1,
        });

        const usersref = doc(db, "Users", userid);
        await setDoc(
          usersref,
          {
            quizs: arrayUnion(...[{ quizId: res.id, details: Details }]),
            answers: arrayUnion(...[{ quizId: res.id, result: [] }]),
          },
          { merge: true }
        );

        return res.id;
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  },
  getQuizByID: async (quizId) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      const quiz = await getDoc(quizref);

      return quiz.data();
    } catch (err) {
      return undefined;
    }
  },
  getAnswersByID: async (userId, quizId) => {
    const userref = doc(db, "Users", userId);
    try {
      const user = await getDoc(userref);

      const currentAnswer = user
        .data()
        .answers?.filter((a) => a.quizId == quizId);

      return currentAnswer[0].result;
    } catch (err) {
      return undefined;
    }
  },
  setAnswer: async (userId, Answers, Quizes) => {
    const usersref = doc(db, "Users", userId);
    try {
      await setDoc(
        usersref,
        {
          answers: Answers,
        },
        { merge: true }
      );
      {
        Quizes &&
          (await setDoc(
            usersref,
            {
              quizs: Quizes,
            },
            { merge: true }
          ));
      }
    } catch (err) {
      return "something went wrong";
    }
  },
  getGrade: async (quizId, Answers) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      const quiz = await getDoc(quizref);

      let grade = 0;

      quiz.data().results.forEach((element, i) => {
        if (element.correct_answer == Answers[i]) grade++;
      });

      return grade;
    } catch (err) {
      return undefined;
    }
  },
  getAllQuiz: async () => {
    const quizref = collection(db, "Quiz");
    try {
      const data = await getDocs(quizref);
      const allquiz = data.docs.map((doc) => doc.data());

      return allquiz;
    } catch (err) {
      return undefined;
    }
  },
  setGradeInQuiz: async (quizId, grade) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      await setDoc(
        quizref,
        {
          grade: arrayUnion(...[grade]),
        },
        { merge: true }
      );
    } catch (err) {
      return "something went wrong";
    }
  },
  getAllUsers: async () => {
    const userref = collection(db, "Users");
    try {
      const data = await getDocs(userref);
      const alluser = data.docs.map((doc) => doc.data());

      return alluser;
    } catch (err) {
      return undefined;
    }
  },
  setChallenge: async (toUserId, byUser, quizId, quizDetail) => {
    const usersref = doc(db, "Users", toUserId);
    const quizref = doc(db, "Quiz", quizId);
    try {
      await setDoc(
        usersref,
        {
          challenge: arrayUnion(
            ...[
              {
                quizId: quizId,
                by: byUser,
                details: quizDetail,
                accepted: false,
              },
            ]
          ),
        },
        { merge: true }
      );
      const quiz = await getDoc(quizref);

      const OldNoOfUsers = quiz.data().noOfUsers;
      await setDoc(
        quizref,
        {
          noOfUsers: OldNoOfUsers + 1,
        },
        { merge: true }
      );
    } catch (err) {
      return "something went wrong";
    }
  },
  acceptQuizs: async (userid, quizId, Details) => {
    const usersref = doc(db, "Users", userid);
    try {
      await setDoc(
        usersref,
        {
          quizs: arrayUnion(...[{ quizId: quizId, details: Details }]),
          answers: arrayUnion(...[{ quizId: quizId, result: [] }]),
        },
        { merge: true }
      );

      return true;
    } catch (err) {
      return undefined;
    }
  },
  deleteQuiz: async (userId, quizId, deleteq, newAnswers, newQuiz) => {
    const usersref = doc(db, "Users", userId);
    try {
      await setDoc(
        usersref,
        {
          answers: newAnswers,
          quizs: newQuiz,
        },
        { merge: true }
      );

      const quizref = doc(db, "Quiz", quizId);
      if (deleteq == 1) {
        await deleteDoc(quizref);
      } else {
        await setDoc(
          quizref,
          {
            noOfUsers: Number(deleteq) - 1,
          },
          { merge: true }
        );
      }
    } catch (err) {
      return "something went wrong";
    }
  },
};

export default services;
