const characterCount = document.querySelector('#journal-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#journal-entry').value.length

    }
}


// Added a query selector to the text area 
// added a key up to that text area
// everytime a key is typed there, it will call the function charcount
// for every time a key is pressed, add one to the character limit   

const url = "http://localhost:8000/test";
const formEl = document.querySelector('form');
formEl.addEventListener('submit', postFormData)

async function postFormData(e) {
  e.preventDefault();
  const current= new Date().toLocaleString() 
  const formData= new FormData(formEl)
  // console.log(formData)
  const formDataSerialised=Object.fromEntries(formData) //look up 
  const jsonObject = {...formDataSerialised, "dateTime": current, "comment": "", "EmojiCount": [0,0,0]}
  console.log(JSON.stringify(jsonObject, null, 2))
  try{
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    // console.log(json)
  }catch(e){
    console.error(e);
    alert('There was an error')
  }
}





