const btn = document.getElementById("getKey")
const result = document.getElementById("result")

btn.onclick = async () => {

let res = await fetch("/generate")
let data = await res.json()

if(data.error){
result.innerText = data.error
}
else{
result.innerText = "Your Key: " + data.key
}

}
