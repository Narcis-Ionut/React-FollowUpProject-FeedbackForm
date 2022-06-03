import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const FeedBackContext = createContext();

export const FeedBackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 9,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 7,
    },
  ]);
  const [feedbackEdit, setFeedBackEdit] = useState({
    item: {},
    edit: false,
  });
  const addFeedBack = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  ///Update feedback item
  const updateFeedBack = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };
  ///set item to be updated
  const editFeedBack = (item) => {
    setFeedBackEdit({
      item,
      edit: true,
    });
  };
  return (
    <FeedBackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedBack,
        editFeedBack,
        updateFeedBack,
      }}
    >
      {children}
    </FeedBackContext.Provider>
  );
};

export default FeedBackContext;
