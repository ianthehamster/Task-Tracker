// Add an event listener to the button elements
const saveButtons = document.querySelectorAll('button[type="button"]');
saveButtons.forEach((button) => {
  button.addEventListener("click", saveTask);
});

/* we first select all the button elements with the attribute 'type="button" and assign them to the buttons constant
 * we then iterate over each button using the "forEach" method and add a click event listener to each button.
 * the event listener is the 'saveTask' function which is called when the button is clicked.
 */

function saveTask(event) {
  // Get the input element associated with the clicked button
  const input = event.target
    .closest(".box-footer")
    .previousElementSibling.querySelector('input[type="text"]');
  /* in the saveTask function, it retrieves the input element associated with the clicked button using DOM traversal
* it goes up two levels in the DOM tree to the parent element and then selects the previous sibling element that 
matches the selector `'input[type="text"]'`.
* see the DOM tree in the developer console to understand it better
*/

  // Get the entered text
  const task = input.value;
  /* we retrieve the entered text from the input element and assign it to the 'task' constant*/

  // Get the unique identifier for the task (e.g., the associated box ID)
  const boxId = input.closest(".box").id;
  /** we then find the unique identifier for the task by traversing up the DOM tree until we 
   find an element with the class "box" and retrieves its ID.
   */

  // Retrieve existing tasks from localStorage or initialize an empty array if no tasks are found
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task to the array
  tasks.push({ boxId, task });
  /**
   * we use the push method to add the new tasks (as an object with `boxID` and `task` properties) to the tasks array
   */

  // Save the updated tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  /** we then save the updated tasks array to the localStorage using the setItem method */

  // clear the input field
  input.value = "";
}

// Add an event listener to the "Download from localStorage" button
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", downloadTasks);
/** we select the element with the ID "download" and assign it to the downloadButton constant
 * we then add a click event listener to the 'downloadButton' that triggers the 'downloadTasks' function when clicked
 */

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearLocalStorage);

function downloadTasks() {
  // Retrieve the tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  /** we retrieve the tasks from the localStorage by parsing the JSON string stored under the key "tasks" back into a Javascript array
   * JSON.parse is a built-in JS method used to parse a JSON string and convert it into a JS object or value
   * transforming JSON strings into Javascript object/value allows you to work with it in your js code
   */

  // Create a string representation of the tasks
  let textData = "";
  tasks.forEach((task) => {
    textData += `Box ID: ${task.boxId}\n`;
    textData += `Task: ${task.task}\n\n`;
  });
  /** we then create an empty string `textData` to store the string representation of the tasks
   * the code iterates over each task using the `forEach` method and appends the task information to the `textData` string
   */

  // Create a Blob object with the text data
  const blob = new Blob([textData], { type: "text/plain" });
  /** Blob (Binary Large Object) is a built-in JS object that represents a file of raw data
   * the Blob object here is created to hold the text data that will be downloaded as a file
   * after creating the string representation, it creates a Blob object with the `textData` and specifies the MIME type as "text/plain"
   */

  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);
  /**
   * creating a temporary URL for the Blob serves the purpose of initiating a file download in the web browser
   *
   */

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = url;
  link.download = "tasks.txt";
  /**
   * we then create a temporary link element, assigns the URL to the 'href' attribute, 
    and sets the'download' attribute to "tasks.text" to specify the file name when downloaded
    *
   */

  // Trigger the download
  link.click();
  /** the code triggers the download by programmatically clicking the link element using link.clickl() */

  // Clean up the temporary URL and link
  URL.revokeObjectURL(url);
  link.remove();
  /** we then clean up the temporary URL and remove the link element from the DOM */
}

function clearLocalStorage() {
  localStorage.removeItem("tasks");
}
