const characterCount = document.querySelector('#journal-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        console.log('found')
        console.log(document.querySelector('#journal-entry').value)
        document.querySelector('#current').textContent=document.querySelector('#journal-entry').value.length
        
    }
}

// Added a query selector to the text area 
// added a key up to that text area
// everytime a key is typed there, it will call the function charcount
//for every time a key is pressed, add one to the character limit   