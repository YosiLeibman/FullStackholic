// Classes 
class Beverages {
    constructor(abv, countrey, img, awards = []) {
        this.abv = abv;
        this.countrey = countrey;
        this.img = img;
        this.awards = awards;
        Beverages.stock++;
    }
}
Beverages.stock = 0;
class Beer extends Beverages {
    constructor(abv, countrey, img, awards, brewery, style, ibu) {
        super(abv, countrey, img, awards);
        this.brewery = brewery;
        this.style = style;
        this.ibu = ibu;
        Beer.stock++;
    }
    getName() {
        return `${this.brewery}, ${this.countrey}`;
    }
    getSummary() {
        return `was brewed by ${this.brewery} from ${this.countrey}`;
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">style: ${this.style}</li>
        <li class="list-group-item">ibu: ${this.ibu}</li>
        `;
    }
}
Beer.stock = 0;
class Whiskey extends Beverages {
    constructor(abv, countrey, img, awards, distillery, style, age) {
        super(abv, countrey, img, awards);
        this.distillery = distillery;
        this.style = style;
        this.age = age;
        Whiskey.stock++;
    }
    getName() {
        return `${this.distillery}, ${this.countrey}`;
    }
    getSummary() {
        return `was distilled by ${this.distillery} from ${this.countrey}`;
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">style: ${this.style}</li>
        <li class="list-group-item">age: ${this.age}</li>
        `;
    }
}
Whiskey.stock = 0;
class Wine extends Beverages {
    constructor(abv, countrey, img, awards, winery, grapes, vintage) {
        super(abv, countrey, img, awards);
        this.winery = winery;
        this.grapes = grapes;
        this.vintage = vintage;
        Wine.stock++;
    }
    getName() {
        return `${this.winery}, ${this.countrey}`;
    }
    getSummary() {
        return `was aged at ${this.winery} caves in ${this.countrey}`;
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">grapes: ${this.grapes}</li>
        <li class="list-group-item">vintage: ${this.vintage}</li>
        `;
    }
}
Wine.stock = 0;
// Local Vars
let isModalOpen = false;
let stock = [
    new Beer(4.3, "israel", "https://i2.wp.com/super-arlozorov.co.il/wp-content/uploads/2019/03/jems-ipa.jpg?fit=1176%2C1248&ssl=1", undefined, "Jem's", "IPA", 57),
    new Beer(5.7, "israel", "https://upload.wikimedia.org/wikipedia/he/thumb/e/e0/Alexander_Beer_Green.jpg/450px-Alexander_Beer_Green.jpg", undefined, "Alexander", "green", 37),
    new Whiskey(46, "Scotland", "https://d256619kyxncpv.cloudfront.net/gui/img/2014/12/05/14/2014120514_ardbeg_10_year_old_original.png", undefined, "Ardbeg", "smokey islay", 10),
    new Whiskey(50, "Scotland", "https://images-na.ssl-images-amazon.com/images/I/818v89ra%2BAL._AC_SL1500_.jpg", undefined, "lafroigh", "smokey islay", 10),
    new Wine(13.2, "Israel", "https://273628-849438-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/11/virtuoso.jpg", undefined, "Hayotzer", "Virtuoso", 2013)
];
// DOM Traversing
let labelArr = document.querySelectorAll("label");
let addbtn = document.querySelector(".floatbtn");
let addRadioArr = document.querySelectorAll('input[name="optionsadd"]');
let fst = document.querySelector("#fst");
let snd = document.querySelector("#snd");
let trd = document.querySelector("#trd");
let abv = document.querySelector("#abv");
let countery = document.querySelector("#countery");
let img = document.querySelector("#img");
// Event Handlers
function handleFilter(e) {
    labelArr.forEach(l => {
        if (l != e.currentTarget && l.className.includes("active")) {
            l.classList.remove("active");
        }
    });
    e.currentTarget.classList.add("active");
    // filter the view draw
    switch (e.target.id) {
        case "allinp":
            draw(stock);
            break;
        case "beerinp":
            draw(stock.filter(b => b instanceof Beer));
            break;
        case "whiskeyinp":
            draw(stock.filter(b => b instanceof Whiskey));
            break;
        case "wineinp":
            draw(stock.filter(b => b instanceof Wine));
            break;
        default:
            break;
    }
}
let draw = (arr) => {
    let listElm = document.querySelector(".list");
    let [allbdg, beerbdg, whiskeybdg, winebdg] = document.querySelectorAll(".badge");
    allbdg.textContent = Beverages.stock.toString();
    beerbdg.textContent = Beer.stock.toString();
    whiskeybdg.textContent = Whiskey.stock.toString();
    winebdg.textContent = Wine.stock.toString();
    // zero items
    if (arr.length == 0) {
        listElm.innerHTML = `<h1 class="display-4">there's nothing here 😣</h1>`;
    }
    else {
        listElm.innerHTML = '';
        for (let bvrg of arr) {
            listElm.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${bvrg.img}" class="card-img-top" alt="b-img">
        <div class="card-body">
        <h5 class="card-title">${bvrg.getName()}</h5>
        <p class="card-text">${bvrg.getSummary()}.</p>
        <ul class="list-group list-group-flush">
        ${bvrg.getList()}
        </ul>
        </div>
        </div>
        `;
        }
    }
};
let modal = () => {
    console.log("here");
    let mod = document.querySelector(".modal");
    if (isModalOpen) { // if open ==> close
        mod.style.display = "none";
        console.log("closed");
        addbtn.textContent = "+";
    }
    else { // if closed ==> open
        mod.style.display = "block";
        console.log("opened");
        addbtn.textContent = "x";
    }
    // for the next click
    isModalOpen = !isModalOpen;
    console.log("new state:", isModalOpen);
};
document.querySelector("#add-form").addEventListener("submit", e => {
    e.target.reset();
    e.preventDefault(); //don't refresh
    modal(); // close modal
    switch (document.querySelector('input[name="optionsadd"]:checked').id) {
        case "beeraddinp":
            stock.push(new Beer(abv.valueAsNumber, countery.value, img.value, undefined, fst.value, snd.value, trd.valueAsNumber));
            break;
        case "whiskeyaddinp":
            stock.push(new Whiskey(abv.valueAsNumber, countery.value, img.value, undefined, fst.value, snd.value, trd.valueAsNumber));
            break;
        case "wineaddinp":
            stock.push(new Wine(abv.valueAsNumber, countery.value, img.value, undefined, fst.value, snd.value, trd.valueAsNumber));
            break;
        default:
            break;
    }
    draw(stock);
});
addbtn.addEventListener("click", modal);
labelArr.forEach(label => {
    label.addEventListener("click", handleFilter);
});
addRadioArr.forEach(radio => {
    radio.addEventListener("change", e => {
        console.log(e.target.id);
        switch (e.target.id) {
            case "beeraddinp":
                fst.parentNode.childNodes[1].textContent = "brewery";
                snd.parentNode.childNodes[1].textContent = "style";
                trd.parentNode.childNodes[1].textContent = "ibu";
                break;
            case "whiskeyaddinp":
                fst.parentNode.childNodes[1].textContent = "distillery";
                snd.parentNode.childNodes[1].textContent = "style";
                trd.parentNode.childNodes[1].textContent = "age";
                break;
            case "wineaddinp":
                fst.parentNode.childNodes[1].textContent = "winery";
                snd.parentNode.childNodes[1].textContent = "grapes";
                trd.parentNode.childNodes[1].textContent = "vintage";
                break;
            default:
                break;
        }
    });
});
// Main
draw(stock);
