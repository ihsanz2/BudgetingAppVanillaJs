//Budget controller

const budgetController = (function(){
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {

        if (totalIncome>0){
            this.percentage = Math.round( ( this.value/totalIncome ) *100 );
        }else{
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }


    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return {
        
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },

        deleteItem : function (type,id){

            let ids = data.allItems[type].map(function(current){
                return  current.id
            });

            let index = ids.indexOf(id);

            if (index !== -1){
                data.allItems[type].splice(index,1);
            }

        },

        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
        
        calculatePercentages : function () {
            
            data.allItems.exp.forEach(function(cal){
                 cal.calcPercentage(data.totals.inc)
            })

        },

        getPercentages : function (){

            let allPerc = data.allItems.exp.map(function(cal){
                return cal.getPercentage()
            })
            return allPerc;
        },

        testing : function () {
            console.log(data)
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
    }
    
})();



//UI controller
const UIController = (function (){
        //Object DOMstring local(closeure)
        let DOMstrings ={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container : '.container',
        expensesPercLabel : '.item__percentage',
        dateLabel : '.budget__title--month',
        }


        return {
            getInput: function() {
                return {
                    type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                    description: document.querySelector(DOMstrings.inputDescription).value,
                    value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
                };
            },
            //buat global/public methode
            addListItem:function(obj,type){
                var html,newHtml,element;

                if (type === 'inc') {
                    element = DOMstrings.incomeContainer;
                    
                    html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                } else if (type === 'exp') {
                    element = DOMstrings.expensesContainer;
                    
                    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%value%',obj.value);
                
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


            },

            deleteListItem : function (selectorID){
                el = document.getElementById(selectorID);

                el.parentNode.removeChild(document.getElementById(selectorID))
            },

            //membuat object DOMstring menjadi Global
            clearFields: function() {
                var fields, fieldsArr;
                
                fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
                
                fieldsArr = Array.prototype.slice.call(fields);
                
                fieldsArr.forEach(function(current, index, array) {
                    current.value = "";
                });
                
                fieldsArr[0].focus();
            },
            displayBudget: function(obj) {
                var type;
                obj.budget > 0 ? type = 'inc' : type = 'exp';
                
                document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
                document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
                document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp, 'exp';
                
                if (obj.percentage > 0) {
                    document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
                } else {
                    document.querySelector(DOMstrings.percentageLabel).textContent = '---';
                }
                
            },

            displayPercentages : function (percentages) {
                
                let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

                let nodeListForEach = function (list, callback){
                    for (i =0; i<list.length; i++){
                        callback(list[i], i)
                    }
                }
                              
                
                nodeListForEach(fields, function(current,index){

                    if (percentages[index]>0){
                        current.textContent = percentages[index] + '%';
                    } else {
                        current.textContent = '--'
                    }
                })
            },

            displayMonth : function () {
                let now = new Date();
                let months = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
                let month = now.getMonth()
                let year = now.getFullYear();
                document.querySelector(DOMstrings.dateLabel).textContent = months[month] +' '+year;


            },

            
             
            getDOMstrings: function() {
                return DOMstrings;
            },
        }
})();



//global App controller (kontrol smua event)
const controller =  (function(budgetCtrl,UICtrl){

    let setupEventListeners = function  (){
        let DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    let updateBudget = function() {
        
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = function () {
        //
        budgetCtrl.calculatePercentages()

        let percentages = budgetCtrl.getPercentages()

        UICtrl.displayPercentages(percentages )


    }
    


    let ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

        // clear input/field
            UICtrl.clearFields();
        //4. calculate budget

        //5. display budget

        //6. Update dan kalkulasi budget
            updateBudget()
        //7. Update persentase
            updatePercentages();
            
        }
        return console.log(input)
    }

    ctrlDeleteItem = function (e){
        let itemID, splitID;

        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){

            splitID = itemID.split('-');

            type = splitID[0];

            ID = parseInt(splitID[1])

            budgetController.deleteItem(type, ID)

            UICtrl.deleteListItem(itemID)
            
            updateBudget()


            updatePercentages();

        }
    }

    return {
        init : function (){
            console.log (`server jalan`);
            UIController.displayMonth();
            UICtrl.displayBudget(
                {
                    budget:0,
                    totalInc:0,
                    totalExp: 0,
                    percentage: -1,
                }
            );
            return setupEventListeners();
        }
    }

    

})(budgetController, UIController)

controller.init()