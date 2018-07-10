//Budget controller

const budgetController = (function(){
    //
})();



//UI controller
const UIController = (function (){

})();



//global App control
const controller =  (function(budgetController,UIController){

    document.querySelector('.add__btn').addEventListener('click',function(){
        console.log(`botton di click`)
    })

})(budgetController, UIController)