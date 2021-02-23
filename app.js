const warning=document.getElementById('warning');
const searchButton =document.getElementById('searchBtn');
const data = document.getElementById('foods');

searchButton.addEventListener('click',function(){
  const keyword = document.getElementById('keyword').value;
  data.innerHTML = '';
  if(keyword==''){
      warning.style.display='block';
  }
  else{
    getFoodItems(keyword);
    warning.style.display='none';
  }
  
})
// get the food details area
const displayDetails=name=>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`
    fetch (url)
    .then(res=>res.json())
    .then(data=>{renderFoodDetail(data.meals[0]);
     
    });
}
const renderFoodDetail=food=>{
    const foodDiv=document.getElementById('foodDiv');
        foodDiv.innerHTML=`
        <div>
        <button onclick="HideDetails()"type="button" class="btn-close" aria-label="Close"></button>
        <img class="img-fluid rounded" src="${food.strMealThumb}">
        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
        <h3>Ingredients</h3>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure1}, ${food.strIngredient1}</p>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure2}, ${food.strIngredient2}</p>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure3}, ${food.strIngredient3}</p>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure4}, ${food.strIngredient4}</p>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure5}, ${food.strIngredient5}</p>
        <p class="h6 py-4 px-2 mb-0">${food.strMeasure6}, ${food.strIngredient6}</p>
        </div>`
        foodDiv.style.display='block'; 
}
// hide details area
function HideDetails(){
    foodDiv.style.display="none";
}
// get the food with image area
function getFoodItems(mealId){
    const api=`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`
     fetch(api)
    .then(res=>res.json())
    .then(data=>{
        displayFoods(data.meals);
    });
    const displayFoods=foods=>{
        const foodsDiv= document.getElementById('foods');
        if(foods!=null){
            foods.map(food=>{
                const foodDiv=document.createElement('div');
                foodDiv.className='col-md-3';
                const foodInfo=`
                <div class="border h-100"> 
                <img class="img-fluid rounded-top" src="${food.strMealThumb}">
                <h4 class="h4 py-4 px-2 mb-0">${food.strMeal}</h4>
                <button onclick="displayDetails('${food.idMeal}')" type="button" class="btn btn-info button">Details</button>
               
               </div>`;
                foodDiv.innerHTML=foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
            
        }else {
            warning.style.display = 'block';
        }
    }
}