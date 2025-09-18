const Sbutton = document.querySelector(".btn");
const searchBox =  document.querySelector(".search");
const  recipeContainer = document.querySelector(".dishContainer"); 
const container = document.querySelector(".container")
const home = document.querySelectorAll(".k");



const url = async (query)=>{
  
    recipeContainer.innerHTML= "searching....";

    const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    let response = await fetch(url);
    let  data= await response.json();
    recipeContainer.innerHTML= ""; 

    data.meals.forEach((meal) => {
    const recipeNewContainer = document.createElement("div");
    recipeNewContainer.classList.add("dish")
    recipeNewContainer.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <p> origin <span>${meal.strArea}</span></p>
    <p> type of <span>${meal.strCategory}</span></p>
    <button class = "recipebtn"> View Recipe </button>`
    recipeContainer.appendChild(recipeNewContainer);
    const recipebtn = recipeNewContainer.querySelector(".recipebtn");
    recipebtn.addEventListener("click" ,()=>{
      popuprecipe(meal);
      recipebtn.disable;
    });

    


    
})  

const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i=0; i<=20; i++){
        const ingredient =  meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${ingredient}  ${measure}</li>`
        }
        else{
            break;
        }
    }

    return ingredientsList;
}

const popuprecipe = (meal)=>{
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
    <button type="button" class ="closebtn"><i class="fa-solid fa-xmark"></i></button>
    <h2 ><p class = "popupMealHead">${meal.strMeal}</p></h2>
     
     <div>
     <h3> Recipe : <p>${meal.strInstructions}</p></h3>
     </div>
      <ul>${fetchIngredients(meal)}</ul>
    `
    document.body.appendChild(popup);
    const closebtn = popup.querySelector(".closebtn");
    closebtn.addEventListener("click" , ()=>{
        popup.remove();
        
    })



}



}


Sbutton.addEventListener("click" , (e)=>{
    e.preventDefault(); 
    const search = searchBox.value.trim();
    url(search);


})


