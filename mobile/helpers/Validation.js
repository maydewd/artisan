
export function ValidateNewPost(data) {

  var errs = [];
  if (data.description === null) {
    errs.push("a description");
  }
  if (data.price === null) {
    errs.push("a price");
  }
  if (data.type === null) {
    errs.push("a type");
  }
  if (data.photoSource === null) {
    errs.push("a photo");
  }
  if (errs.length !== 0) {
    var message = _getMessage("Please enter", errs);
    throw new UserInputException(message);
  }
}

//Appends the list of descriptions in the message array to the starting String start
function _getMessage(start, messages) {

  var length = messages.length;
  if (length === 0) {
    return start;
  }
  var ans = "";
  ans += start + " " + messages[0];
  if (length === 1) {
    return ans;
  }
  for (i = 1; i < length-1; i++) {
    ans += ", " + messages[i];
  }
  if (length !==2) {
    ans+= ","
  }
  ans += " and " + messages[length-1];
  return ans;
}

function UserInputException(message) {
   this.message = message;
   this.name = "UserInputException";
}
