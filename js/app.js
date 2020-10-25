//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//event listeners
evenListeners();

function evenListeners(){
    //cuando un usuario agrega un nuevo tweet
formulario.addEventListener('submit',agregarTweet);

    //cuabndo el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets =JSON.parse (localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    })
}


//funciones
function agregarTweet(e){
    e.preventDefault();
    
    //textarea
    const tweet = document.querySelector('#tweet').value
  
    //validacion
    if(tweet ===''){
        mostrarError('el mensaje no puede ir vacio')
        return;
    }

    const tweetOBJ ={
        id: Date.now(),
        texto:tweet
    }

   //añadir el arreglo de tweets
   tweets = [...tweets, tweetOBJ];
   
   crearHTML();

   //reiniciar el formulario
   formulario.reset();

};
//creando el mensaje de error
function mostrarError(error){
 const mensajeError = document.createElement('p');
 mensajeError.textContent=error;
 mensajeError.classList.add('error');

 //inserta el mensaje en el html

 const contenido = document.querySelector('#contenido');
 contenido.appendChild(mensajeError);

 setTimeout(()=>{
     mensajeError.remove();
 },2000);
 
}

//muestra un listado de tweets
function crearHTML(){

    limpiarHTML()

    if (tweets.length > 0){
        
        tweets.forEach (tweet => {
            //agregar el boton de eliminar
            const bntEliminar =document.createElement('a');
            bntEliminar.classList.add('borrar-tweet');
            bntEliminar.innerText='X';

            //añadir la funcion eliminar
            bntEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.texto;

            //asignar el boton
            li.appendChild(bntEliminar);

            //insertarlo en el html
            listaTweets.appendChild(li);
        } );
    }

    sincronizarStorage();
}
//agrega los tweets al localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets' , JSON.stringify(tweets));
}


//limpiar html

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();

   
}