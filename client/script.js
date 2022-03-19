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

const url = "https://hookb.in/LgYdxgxklZC18VqqgwRM";
const formEl = document.querySelector('form');
formEl.addEventListener('submit', postFormData)

async function postFormData(e) {
  e.preventDefault();
  const current= new Date().toLocaleString() 
  const formData= new FormData(formEl)
  const formDataSerialised=Object.fromEntries(formData)
  const jsonObject = {...formDataSerialised, dateTime: current}
  console.log(jsonObject)
  try{
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    console.log(json)
  }catch(e){
    console.error(e);
    alert('There was an error')
  }
}


// const url = "https://hookb.in/LgYdxgxklZC18VqqgwRM";
// const formEl = document.querySelector('form');
// formEl.addEventListener('submit', postFormData)

// function postFormData(e){
//   e.preventDefault();
//   const current= new Date().toLocaleString() 
//   const formData= new FormData(formEl)
//   const formDataSerialised=Object.fromEntries(formData)
//   const jsonObject = {...formDataSerialised, dateTime: current}
//   console.log(jsonObject)
//   const response = await fetch(url, {
//       method: 'POST', 
//       body: JSON.stringify(jsonObject),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
// }






// const submit = document.querySelector('form');
// submit.addEventListener('submit', hello)

// function hello(e){
//     e.preventDefault()
//     let list = document.querySelector('#serp');
//     console.log(document.querySelector('#journal-text').value)
//     let text = document.querySelector('#journal-text').value;
//     let title = document.querySelector('#journal-title').value;
//     const li = document.createElement('li')
//     li.textContent= `<section class="padding">
//     <div>
//         <div class="card-body">
//             <h5 class="card-title">${title}</h5>
//             <p class="card-text">${text}/p>
//         </div>
//         <div style="padding:0em 1em 1em 1em">     
//             <iframe allow="fullscreen" frameBorder="0" height="270" src="https://giphy.com/embed/oD3muIFl7WzfS0hF42/video" width="480"></iframe>   
//         </div>       
//         <div class="container">
//             <div class="row">
//               <div class="col text-center">
//                 <button style="width:100%">&#128077; 1</button>
//               </div>
//               <div class="col text-center">
//                 <button style="width:100%">&#128078; 1</button>
//               </div>
//               <div class="col text-center">
//                 <button style="width:100%">&#10084; 1</button>
//               </div>
//             </div>
//           </div>   
//     </div>
// </section>`
//     list.append(li)
// }