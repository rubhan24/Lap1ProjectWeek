// ----------------------------- CHARACTER COUNT --------------------------------
const characterCount = document.querySelector('#journal-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#journal-entry').value.length

    }
}

let gifLink = '';

// ----------------------------- Sending a POST request with form data to the backend --------------------------------
const formEl = document.querySelector('form');
formEl.addEventListener('submit', postFormData)
let count=0;

async function postFormData(e) {
  const current= new Date().toLocaleString() 
  const formData= new FormData(formEl) // console.log this to check what format this is in 
  const formDataSerialised=Object.fromEntries(formData) //console.log this to see what this does
  const jsonObject = {...formDataSerialised, "dateTime": current, "comment": [], "EmojiCount": [0,0,0], "gifLink":gifLink, 'id':count}
  console.log(JSON.stringify(jsonObject, null, 2))
  try{
    const response = await fetch('https://salty-lake-91235.herokuapp.com/test', {
      method: 'POST', 
      body: JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
  }catch(e){
    console.error(e);
    alert('There was an error')
  }
}

// ----------------------------- Fetching Data from the Backend and creating a post for each item in the input.json file--------------------------------
fetch('https://salty-lake-91235.herokuapp.com/print')
.then(resp =>  resp.json())
.then(resp=> {
  console.log(resp)
  createPost(resp)
})

function createPost(resp){
   resp.forEach(item => {
 
    count++
    console.log(item.comment)
    let postList = document.querySelector('#postHere')
    const eachPostSection = document.createElement('section')
    postList.appendChild(eachPostSection)

    const eachPostDiv=document.createElement('div')
    eachPostDiv.setAttribute('id', 'post')
    eachPostSection.appendChild(eachPostDiv)

      const cardBody=document.createElement('div')
      cardBody.setAttribute('class', "card-body")
      eachPostDiv.appendChild(cardBody)

          const itemTitle=document.createElement('h2')
          itemTitle.setAttribute('class', 'card-title')
          itemTitle.textContent=item.journalTitle
          cardBody.appendChild(itemTitle)

          const itemDateTime=document.createElement('p')
          itemDateTime.setAttribute('class', 'card-title')
          itemDateTime.textContent=item.dateTime
          cardBody.appendChild(itemDateTime)

          const itemEntry=document.createElement('p')
          itemEntry.setAttribute('class', 'card-text')
          itemEntry.textContent=item.journalEntry
          cardBody.appendChild(itemEntry)
        
      const imgDiv=document.createElement('div')
      imgDiv.setAttribute('style', 'padding:0em 1em 1em 1em')
      eachPostDiv.appendChild(imgDiv)

          const gifImg=document.createElement('img')
          gifImg.setAttribute('src', `${item.gifLink}`)
          imgDiv.appendChild(gifImg)
        
      const divButton=document.createElement('div')
      divButton.setAttribute('style', 'padding:0em 1em 1em 1em')
      eachPostDiv.appendChild(divButton)

          const divContainer=document.createElement('div')
          divContainer.setAttribute('class', 'row')
          divButton.appendChild(divContainer)

            const divCol1=document.createElement('div')
            divCol1.setAttribute('class', 'col text-center')
            divContainer.appendChild(divCol1)

                const emojiButton1=document.createElement('a')
                emojiButton1.setAttribute('style', "width:100%")
                emojiButton1.setAttribute('role', 'button')
                emojiButton1.setAttribute('class', 'btn btn-secondary')
                emojiButton1.setAttribute('onclick', `counterIncrease(${item.id}, 'up')`)
                emojiButton1.textContent=`👍 ${item.EmojiCount[0]}`
                divCol1.appendChild(emojiButton1)

            const divCol2=document.createElement('div')
            divCol2.setAttribute('class', 'col text-center')
            divContainer.appendChild(divCol2)
  
                const emojiButton2=document.createElement('a')
                emojiButton2.setAttribute('style', "width:100%")
                emojiButton2.setAttribute('role', 'button')
                emojiButton2.setAttribute('class', 'btn btn-secondary')
                emojiButton2.setAttribute('onclick', `counterIncrease(${item.id}, 'down')`)
                emojiButton2.textContent=`👎 ${item.EmojiCount[1]}`
                divCol2.appendChild(emojiButton2)

            const divCol3=document.createElement('div')
            divCol3.setAttribute('class', 'col text-center')
            divContainer.appendChild(divCol3)
  
                const emojiButton3=document.createElement('a')
                emojiButton3.setAttribute('style', "width:100%")
                emojiButton3.setAttribute('role', 'button')
                emojiButton3.setAttribute('class', 'btn btn-secondary')
                emojiButton3.setAttribute('onclick', `counterIncrease(${item.id}, 'heart')`)
                emojiButton3.textContent=`❤️ ${item.EmojiCount[2]}`
                divCol3.appendChild(emojiButton3)

      const commentTitle=document.createElement('div')
      commentTitle.setAttribute('class', 'comments')
      commentTitle.setAttribute('style', 'padding:0em 1em 0em 1em')

      eachPostDiv.appendChild(commentTitle)
          
          const h2CommentTitle=document.createElement('h3')
          h2CommentTitle.textContent='Comments'
          commentTitle.appendChild(h2CommentTitle)

          const commentBoxDiv=document.createElement('div')
          commentBoxDiv.setAttribute('id', 'comment-box')
          commentTitle.appendChild(commentBoxDiv)

            if(item.comment.length===0){
              const noCommentDiv=document.createElement('div')
              commentTitle.setAttribute('od', 'noComment')
              const noComment=document.createElement('p')
              noComment.textContent="No Comments Found Here"
              noCommentDiv.appendChild(noComment)
              commentBoxDiv.appendChild(noCommentDiv)
            }else{

              for(let i=0; i<item.comment.length;i++){  
                const commentDi=document.createElement('div')
                const comDateTimePTag=document.createElement('p')
                comDateTimePTag.textContent=`${item.comment[i].comDateTime}`
                const commentPTag=document.createElement('p')
                commentPTag.textContent=`${item.comment[i].comment}`
                commentDi.appendChild(comDateTimePTag)
                commentDi.appendChild(commentPTag)
                commentBoxDiv.appendChild(commentDi)
              }
            }


      const divComment=document.createElement('div')
      divComment.setAttribute('class', 'container')
      eachPostDiv.appendChild(divComment)
        
        const leaveComment=document.createElement('h3')
        leaveComment.textContent='Leave us a comment'
        divComment.appendChild(leaveComment)
        
        const commentForm=document.createElement('form')
        divComment.appendChild(commentForm)

            const commentTextArea=document.createElement('textarea')
            commentTextArea.setAttribute('id',`${item.id}`)
            commentTextArea.setAttribute('class',`form-control`)

            commentTextArea.setAttribute('placeholder','Add your comment')
            commentTextArea.setAttribute('value',' ')
            commentForm.appendChild(commentTextArea)

            const commentBtnDiv=document.createElement('div')
            commentBtnDiv.setAttribute('id', 'commentBtn')
            commentForm.appendChild(commentBtnDiv)

              const commentBtn=document.createElement('a')
              commentBtn.setAttribute('id', 'submitComment')
              commentBtn.setAttribute('itemId',`${item.id}`)
              commentBtn.setAttribute('role', 'button',)
              commentBtn.setAttribute('class', 'btn btn-primary')
              commentBtn.textContent='Comment'
              commentBtn.setAttribute('onclick', `sendComment(${item.id})`)
              commentBtnDiv.appendChild(commentBtn)

//       <div id="post">       
//         <div class="card-body">
//             <h5 class="card-title">${item.journalTitle}</h5>
//             <h7 class="card-title">${item.dateTime}</h7>
//             <p class="card-text">${item.journalEntry}</p>
//         </div>
//         <div style="padding:0em 1em 1em 1em">  
//             <img src="${item.gifLink}">  
//         </div>       
//         <div class="container">
//             <div class="row">
//               <div class="col text-center">
//                 <button style="width:100%" type="button" onclick="counterIncrease('${item.id}', 'up')">&#128077; ${item.EmojiCount[0]}</button>
//               </div>
//               <div class="col text-center">
//                 <button style="width:100%" onclick="counterIncrease('${item.id}', 'down')">&#128078; ${item.EmojiCount[1]}</button>
//               </div>
//               <div class="col text-center">
//                 <button style="width:100%" onclick="counterIncrease('${item.id}', 'heart')">&#10084; ${item.EmojiCount[2]}</button>
//               </div>
//             </div>
//         </div>  
//         <div class="comments"> 
//             <h2>Comments</h2>
//             <div id="comment-box">
//                 <p>${item.comment}</p>
//             </div>
//         </div> 
//         <div class="container"> 
//           <h2>Leave us a comment</h2>
//           <form>
//               <textarea id="${item.id}" placeholder="Add Your Comment" value=" " onfocus="appear(${item.journalTitle.split(" ").join("")})" onblur="clickAway(${item.journalTitle.split(" ").join("")})"></textarea>
//               <div id="commentBtn">
//                   <input id="submitComment" type="button" value="Comment" onclick="sendComment(${item.id})"> 
//                   <button type="button" id="clear" onclick="clearCommentSection(${item.journalTitle.split(" ").join("")})">Cancel</button>
//               </div> 
//           </form>
//         </div>
//       </div>
 
postList.prepend(eachPostSection)
  }) 
}

// ----------------------------- GIF SEARCH FUNCTION WHICH ASSIGNS THE GLOBAL VARIABLE, GIF LINK, WHEN YOU PRESS THE FIND GIF BUTTON IN THE FORM --------------------------------
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
      // console.log(json.data[index].images.fixed_height.url)
      let imgPath = json.data[index].images.fixed_height.url
      let gifImage=document.querySelector("#gifImage")
      // let img = document.createElement("img")
      gifImage.setAttribute("src", imgPath)
      gifLink = imgPath;
  })
}

// ----------------------------- counterIncrease FUNCTION WHICH SENDS INFO TO BACKEND WHEN YOU PRESS THE EMOJI BUTTON IN EACH POST --------------------------------
function counterIncrease(id,emoji,event){
  // console.log('got' + journaltitle + emoji)
  fetch('https://salty-lake-91235.herokuapp.com/emojiUpdate', {
    method: 'PUT',
    body: JSON.stringify({ id: id, emoji: emoji }),
    headers: { 'Content-Type': 'application/json' },
  })
}

// ----------------------------- sendComment FUNCTION WHICH SENDS COMMENT TO BACKEND WHEN YOU PRESS THE COMMENT BUTTON IN EACH POST --------------------------------
function sendComment(id) {
  const textBoxValue= document.getElementById(`${id}`).value
  if (textBoxValue.length>0){

    console.log(id)
    const commentDateTime= new Date().toLocaleString() 
  
    console.log(textBoxValue)
    // console.log(textBoxValue)
    // console.log(journalTitle)
    fetch('https://salty-lake-91235.herokuapp.com/comments', {
      method: 'PUT',
      body: JSON.stringify({ comment: textBoxValue, id: id, comDateTime: commentDateTime}),
      headers: { 'Content-Type': 'application/json' },
    })
  } else{
    alert('Please enter a comment!')
  }
}