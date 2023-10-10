
export function sanitizeInputValue(inputValue) {
  return inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function functiongenerateRandomString() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
  let randomString = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

export function strip_html_tags(html){
  return html
}

export function detectInput(input){
  
  switch(true){
    case isSingleLine(input):
      return("singleline")
    case isMultipleLine(input):
      return("multipleLine")

  }
}