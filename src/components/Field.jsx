const Field = (newTitle, setNewTitle) => {
  return (
    <div className="todo__field">
      <label
        className="todo__field-label"
        htmlFor="new-task"
      ></label>
      <input
        id="new-task"
        className="todo__field-input"
        type="text"
        placeholder="Task to be done..."
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
      />
    </div>
  )
}

export default Field
