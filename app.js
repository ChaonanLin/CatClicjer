
// model
var model = {
    currentCat:null,
    adminShow:false,
    cats:[
        {
            clickCount:0,
            name:'Depress Cat',
            imgSrc:'img/cat1.jpg',
        },
        {
            clickCount:0,
            name:'Calm Cat',
            imgSrc:'img/cat2.jpg',
        },
        {
            clickCount:0,
            name:'Confused Cat',
            imgSrc:'img/cat3.jpg',
        },
        {
            clickCount:0,
            name:'Happy Cat',
            imgSrc:'img/cat4.jpg',
        },
        {
            clickCount:0,
            name:'Scared Cat',
            imgSrc:'img/cat5.jpg',
        }
    ],
};

// octopus
var octopus = {
    init:function(){
        model.currentCat=model.cats[0];
        catListView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },

    getCurrentCat:function(){
        return model.currentCat;
    },

    setCurrentCat: function(cat){
        model.currentCat=cat;
    },

    getCats: function(){
        return model.cats;
    },

    incrementCounter:function(){
        model.currentCat.clickCount++;
        catView.render();
        adminView.render();
    },

    showForms: function(form){
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show(form);
        }
        else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide(form);
        }
    },

    update:function(){
        model.currentCat.name= adminName.value;
        model.currentCat.imgSrc= adminURL.value;
        model.currentCat.clickCount= adminCount.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


// View

var catView ={
    init:function(){
        console.log("catView")
        this.cat = document.getElementById('cat');
        this.catName=document.getElementById('name');
        this.catImage=document.getElementById('image');
        this.count=document.getElementById('cat-count');

        this.catImage.addEventListener('click',function(){
            octopus.incrementCounter();
        });

        this.render();
    },

    render:function(){
        var currentCat= octopus.getCurrentCat();
        this.count.textContent=currentCat.clickCount;
        this.catImage.src=currentCat.imgSrc;
        this.catName.textContent=currentCat.name;
    }
};

var catListView = {
    init:function(){
        this.catList=document.getElementById('cat-list');
        this.render();
    },

    render:function(){
        var cat,el,i;
        var cats=octopus.getCats();
        //empty the cat list
        this.catList.innerHTML='';

        for (i=0; i<cats.length; i++) {
            cat= cats[i];

            el=document.createElement('li');
            el.textContent = cat.name;

            el.addEventListener('click',(function(catCopy){
                return function (){
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.render();
                };
            })(cat));

            this.catList.appendChild(el);
        }
    }
};

var adminView = {
    init: function(){

        console.log("xxxx");
        var adminForm=document.getElementById('InputForms');
        this.adminName=document.getElementById('adminCatName');
        this.adminUrl=document.getElementById('adminCatUrl');
        this.adminCount=document.getElementById('adminCatCount');

        var adminBtn=document.getElementById('button');
        var savebtn=document.getElementById('save');
        var cancelbtn=document.getElementById('cancel');

        // console.log(adminForm);
        adminBtn.addEventListener('click',function(){
            octopus.showForms(adminForm);
        });

        savebtn.addEventListener('click',function(){
            octopus.update();
        });

        cancelbtn.addEventListener('click',function(){
            adminView.hide();
        });

        this.render();
    },

    render:function(){
        var currentCat= octopus.getCurrentCat();
        this.adminName.value=currentCat.name;
        this.adminUrl.value=currentCat.imgSrc;
        this.adminCount.value=currentCat.clickCount;
    },

    show:function(adminForm){
        adminForm.style.display='block';
        this.render();
        adminForm=document.getElementById('InputForms');
        console.log(adminForm);
    },

    hide:function(adminForm){
        adminForm.style.display='none';
        this.render();
    }
};


octopus.init();
