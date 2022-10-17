let nuevo = document.getElementById("nuevo");
let modificar = document.getElementById("modificar");
let borrar = document.getElementById("borrar");
let tabla = document.getElementById("tabla");
let url = "http://localhost:8083/api/Game/all"

traerdatos()
listarcategorias()

function inicial() {
    nuevo.style.display = "none"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "block"
}

function agregar() {
    nuevo.style.display = "block"
    modificar.style.display = "none"
    borrar.style.display = "none"
    datos.style.display = "none"

    document.getElementById("name").value = ""
    document.getElementById("category").value= ""
    document.getElementById("developer").value = ""
    document.getElementById("description").value = ""
    document.getElementById("year").value = ""
    document.getElementById("name").focus()
    
}

function editar(id) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario
            idModif = document.getElementById("idModif")
            developerModif = document.getElementById("developerModif")
            minageModif = document.getElementById("minageModif")
            categoryIdModif = document.getElementById("categoryIdModif")
            nameModif = document.getElementById("nameModif")

            idModif.value = respuesta.items[0].id
            developerModif.value = respuesta.items[0].developer
            minageModif.value = respuesta.items[0].minage
            categoryIdModif.value = respuesta.items[0].category_id
            nameModif.value = respuesta.items[0].name

            document.getElementById("idLabel").innerHTML = "<strong>Game id: </strong>" + idModif.value
            //Configura aspecto visual de la interfaz
            nuevo.style.display = "none"
            modificar.style.display = "block"
            borrar.style.display = "none"
            datos.style.display = "none"
        }
    };
    xhttp.open(
        "GET",
        "http://localhost:8083/api/Game/" + id,
        true
    );
    xhttp.send();
    
}

function eliminar(id) {
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
    url = "http://localhost:8083/api/Game";
  
    /*
    2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
  */
    peticion.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
  
        let respuesta = JSON.parse(this.responseText)
  
        let idList = respuesta.id
        let developerList = respuesta.developer
        let minageList = respuesta.minage
        let category_idList = respuesta.category_id
        let nameList = respuesta.name
  
        
        document.getElementById("idDelete").value = idList
        document.getElementById("idList").innerHTML = "<strong>Id: </strong>" + idList
        document.getElementById("developerList").innerHTML = "<strong>Developer: </strong>" + developerList
        document.getElementById("minageList").innerHTML = "<strong>Minage: </strong>" + minageList
        document.getElementById("category_idList").innerHTML = "<strong>Category id: </strong>" + category_idList
        document.getElementById("nameList").innerHTML = "<strong>Name: </strong>" + nameList


        nuevo.style.display = "none";
        modificar.style.display = "none";
        borrar.style.display = "block";
        datos.style.display = "none";
      }
    };
    peticion.open("GET", url + "/" + id, true);
    peticion.send();
  }
  

function guardarNuevo() {
    //recupera información del formulario
    let nameGame = document.getElementById("name").value
    let category = document.getElementById("category").value
    let developer = document.getElementById("developer").value
    let description = document.getElementById("description").value
    let year = document.getElementById("year").value
    
    let objeto = {
        developer: developer,
        year: parseInt(year),
        category:{id: parseInt(category)},
        name: nameGame,
        description: description        
    };
    
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)

    url = "http://localhost:8083/api/Game/save";

    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
        que funcion valida si la respuesta fue exitosa
        readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
        le aplica formato y modifica la pagina o vista
    */
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

        //Configura el aspecto de la pagina
        traerdatos()
        inicial()
        }
    }

    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
}

function guardarEditar() {
    let url = "http://localhost:8083/api/Game";

    //recupera la informacion de los campos de texto "input"
    idModif = document.getElementById("idModif").value
    developerModif = document.getElementById("developerModif").value
    minageModif = document.getElementById("minageModif").value
    categoryIdModif = document.getElementById("categoryIdModif").value
    nameModif = document.getElementById("nameModif").value

    //crear un objeto javascript
    let objeto = {
        id: idModif,
        developer: developerModif,
        minage: minageModif,
        category_id: categoryIdModif,
        name: nameModif,
    };

    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(objeto)
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()

    /*2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=201, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
   */
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 201) {
            traerdatos()
            inicial()
        }
    }

    //Configura la peticion
    peticion.open("PUT", url, true)
    //Indico que la peticion recibe formato JSON
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    //Hago un llamado o invoco la peticion
    peticion.send(objetoJSON)
}

function guardarBorrar() {
    let url = "http://localhost:8083/api/Game"

    let objetoPeticion = new XMLHttpRequest();
    let id = document.getElementById("idDelete").value

    //objeto javascript
    let parametro = {
        id: id
    }

    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(parametro)

    objetoPeticion.open("DELETE", url, true)
    objetoPeticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    objetoPeticion.send(objetoJSON)

    objetoPeticion.onreadystatechange = function () {
        if (objetoPeticion.readyState == 4 && objetoPeticion.status == 204) {
            traerdatos()
            inicial()
        }
    }
}

function traerdatos() {
    url =  "http://localhost:8083/api/Game/all"
    let registros = ""
    let id = ""

    let xhttp = new XMLHttpRequest();
    let salida = "<strong>Texto del mensaje :</strong>";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            for (let i in respuesta) {
                id = respuesta[i].id
                
                registros += "<tr>\
                        <th scope=\"row\">" + respuesta[i].id + "</th>\
                        <td>" + respuesta[i].developer + "</td>\
                        <td>" + respuesta[i].year + "</td>\
                        <td>" + respuesta[i].category.name + "</td>\
                        <td>" + respuesta[i].name + "</td>\
                        <td>\
                             <button class=\"btn btn-outline-dark\" onclick=\"editar(" + id + ")\">Modificar Juego</button>\
                            <button class=\"btn btn-outline-dark\" onclick=\"eliminar(" + id + ")\">Borrar Juego</button>\
                        </td>\
                        </tr>"

            }

            document.getElementById("registros").innerHTML = registros;

            inicial()
        }
    };
    xhttp.open(
        "GET",
        url,
        true
    );
    xhttp.send();
}

function listarcategorias(){
    let url="http://localhost:8083/api/Category/all"
    let categorias =  document.getElementById("category")

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);
            let opciones = ""
            /*console.log("Primero en formato texto: " + this.responseText)
            console.log("Ahora como json" + respuesta)*/

            console.log(respuesta)
            for(let i in respuesta){
                console.log(respuesta[i].id)
                console.log(respuesta[i].name)
                opciones += '<option value="' +  respuesta[i].id + '">' + respuesta[i].name +'</option>'
            }

            categorias.innerHTML = opciones


        }
    };
    xhttp.open("GET",url,true)
    xhttp.send()

} 