import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([{ id: 1, text: "this item is from context ", rating: 10 }]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  //Add Feedback
  const AddFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  //Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) setFeedback(feedback.filter((item) => item.id !== id));
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)));
  };
  // set Item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };
  return (
    <FeedbackContext.Provider value={{ feedback, deleteFeedback, AddFeedback, editFeedback, feedbackEdit, updateFeedback }}>
      {" "}
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
