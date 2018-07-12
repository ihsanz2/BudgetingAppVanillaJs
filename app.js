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
            inputBtn : '.add__btn',
            incomeContainer: '.income__list',
            expensesContainer: '.expenses__list',

            
        }

        return {
            getinput : function () {
                return {
                    type : document.querySelector(DOMstring.inputType).value,
                    description : document.querySelector(DOMstring.inputDescription).value,
                    value : parseFloat(document.querySelector(DOMstring.inputValue).value)
                };
            },
            //buat global/public methode
            addListItem:function(obj,type){
                var html,newHtml,element;

                if (type==='inc'){
                    element = DOMstring.incomeContainer;
                    html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }else if (type === 'exp'){
                    element = DOMstring.expensesContainer;
                    html= '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%',obj.description);
                newHtml = newHtml.replace('%value%',obj.value);
                
                document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);


            },
            //membuat object DOMstring menjadi Global
            getDOMstring:function(){
                return DOMstring;
            },

            clearFields : function(){
                let fields, fieldsArr;

                fields = document.querySelectorAll(DOMstring.inputDescription +', '+ DOMstring.inputValue);

                fieldsArr = Array.prototype.slice.call(fields);

                fieldsArr.forEach(currentValue => {
                    currentValue.value =  '';
                });
                fieldsArr[0].focus();
            },
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

    let updateBudget = function (){

        // 1.kalkulasi budget

        //2.return budget

        //3.display badget ke UI
    }
    


    let ctrlAddItem = function (){
        //1. ambil input data
        let input = UIController.getinput();
        console.log (input) 

        if (input.description !== '' && !isNaN(input.value) && input.value>0){
            
        //2.masukan item ke budget cnotroller
        let newItem = budgetController.addItem(input.type, input.description, input.value)
        //3.add item ke user intervace
        UIController.addListItem(newItem, input.type)

        // clear input/field
       
        //4. calculate budget

        //5. display budget

        //6. Update dan kalkulasi budget
        updateBudget()
        }
        UIController.clearFields()
        
    }

    return {
        init : function (){
            console.log (`server jalan`);
            return setEvenlistener();
        }
    }

    

})(budgetController, UIController)

controller.init()


