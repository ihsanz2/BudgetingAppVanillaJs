//Budget controller

const budgetController = (function(){
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value =value;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value =value;
    };

    let data = {
        allItems : {
            exp : [],
            inc : [],
        },

        totals : {
            exp : 0,
            inc : 0,
        }
    }
    return {
        addItem : function(type, des, val){
            let newItem,ID;
            
            //membuat id baru
            if (data.allItems[type]>0)
            {
                ID = data.allItems[type] [data.allItems[type].length - 1].id + 1;}
            else {
                ID = 0;
            }
            

            //membuat item baru
            if (type==='exp'){
                newItem = new Expense (ID,des,val)
            }
            else if (type === 'inc')
            {
                newItem = new Expense (ID, des,val)
            }
            //push data baru
            data.allItems[type].push(newItem)

            //kembalikan elemen baru
            return newItem
        },
        testing : function () {
            console.log(data)
        }
    }
    
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
            ctrlAddItem()
            }
        })
    }
    
    


    let ctrlAddItem = function (){
        //1. ambil input data
        let input = UIController.getinput();
        console.log (input)
        //2.masukan item ke budget cnotroller
        let newItem = budgetController.addItem(input.type, input.description, input.value)
        //3.add item ke user intervace

        //4. calculate budget

        //5. display budget
        
    }

    return {
        init : function (){
            console.log (`server jalan`);
            return setEvenlistener();
        }
    }

    

})(budgetController, UIController)

controller.init()


