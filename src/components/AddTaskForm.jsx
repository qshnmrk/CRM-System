import Button from "./Button"
import Field from "./Field"
const AddTaskForm = (newTitle, setNewTitle) => {
  return (
    <form className="todo__form">
      <Field
        newTitle={newTitle}
        setNewTitle={setNewTitle}
      />
      <Button />
    </form>
  )
}
export default AddTaskForm
