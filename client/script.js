//Character Count
const characterCount = document.querySelector('#journal-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#journal-entry').value.length

    }
}

//Sending a POST request to the backend
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
    const response = await fetch('http://localhost:8000/test', {
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

 //Detching Data from the Backend and creating post
fetch('http://localhost:8000/print')
.then(resp =>  resp.json())
.then(resp=> {
  console.log(resp)
  createPost(resp)
})

let postList = document.querySelector('#post')

function createPost(resp){
  resp.forEach(item => {
    // console.log(item)
    const div = document.createElement('div')
    div.innerHTML=
    `<section class="padding">
    <div>
        <div class="card-body">
            <h5 class="card-title">${item.journalTitle}</h5>
            <p class="card-text">${item.journalEntry}</p>
        </div>
        <div style="padding:0em 1em 1em 1em">  
            <iframe allow="fullscreen" frameBorder="0" height="270" src=${item.gifSearch} width="480"></iframe>   
        </div>       
        <div class="container">
            <div class="row">
              <div class="col text-center">
                <button style="width:100%">&#128077; ${item.EmojiCount[0]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%">&#128078; ${item.EmojiCount[1]}</button>
              </div>
              <div class="col text-center">
                <button style="width:100%">&#10084; ${item.EmojiCount[2]}</button>
              </div>
            </div>
          </div>   
    </div>
</section>`
postList.prepend(div)
  }) 
}



// GIF SEARCH
function sendApiRequest() {
  let userInput = document.getElementById("gif-search").value
  console.log(userInput)

  const giphyApiKey = "4qsIN2L7YbHr9wkQfLXylyEPXoG0Z6nZ"
  const giphyApiURL = `http://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`

  fetch(giphyApiURL).then(function(data) {
      return data.json()
  })
  .then(function(json){
      const index = Math.floor(Math.random() * json.data.length)
      console.log(json.data[index].images.fixed_height.url)
      let imgPath = json.data[index].images.fixed_height.url
      let gifImage=document.querySelector("#gifImage")
      // let img = document.createElement("img")
      gifImage.setAttribute("src", imgPath)
      // document.body.appendChild(img)
  })
}



// To extract the GIF URL of the desired gif
// Send it to the JSON file 











