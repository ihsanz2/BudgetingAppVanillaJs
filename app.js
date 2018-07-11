//Budget controller

const budgetController = (function(){
    //
})();



//UI controller
const UIController = (function (){
        //Object DOMstring local(closeure)
        let DOMstring ={
            inputType : '.add__type',
            inputDescription : '.add__description',
            inputValue : '.add__value',
            inputBtn : '.add__btn'
            
        }

        return {
            getinput : function () {
                return {
                    type : document.querySelector(DOMstring.inputType).value,
                    description : document.querySelector(DOMstring.inputDescription).value,
                    value : document.querySelector(DOMstring.inputValue).value
                }
            },
            //membuat object DOMstring menjadi Global
            getDOMstring:function(){
                return DOMstring;
            }
        }
})();



//global App controller
const controller =  (function(budgetController,UIController){

    let setEvenlistener = function  (){
        let DOM = UIController.getDOMstring()//panggil DOMstring global dari UIcontroller
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem)

    document.addEventListener('keypress', function (event) {
        if (event.keyCode===13 || event.which===13){
            ctrlAddItm()
        }
    })
    }
    
    


    let ctrlAddItem = function (){
        //1. ambil input data
        let input = UIController.getinput();
        console.log (input)
        //2.masukan item ke budget cnotroller

        //3.add item ke user intervace

        //4. calculate budget

        //5. display budget
        
    }

    return {
        init : function (){
            console.log (`server jalan`);
            setEvenlistener();
        }
    }

    

})(budgetController, UIController)

controller.init()


