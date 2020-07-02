
// Classes 
abstract class Beverages {
    static stock = 0
    constructor(
        public abv: number,
        public countrey: string,
        public img: string,
        public awards: string[] = []) {
        Beverages.stock++
    }
    abstract getName()
    abstract getSummary()
    abstract getList()
}

class Beer extends Beverages {
    static stock = 0
    constructor(
        abv,
        countrey,
        img,
        awards,
        public brewery: string,
        public style: string,
        public ibu: number) {
        super(abv, countrey, img, awards)
        Beer.stock++
    }
    getName() {
        return `${this.brewery}, ${this.countrey}`
    }
    getSummary() {
        return `was brewed by ${this.brewery} from ${this.countrey}`
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">style: ${this.style}</li>
        <li class="list-group-item">ibu: ${this.ibu}</li>
        `
    }
}

class Whiskey extends Beverages {
    static stock = 0
    constructor(
        abv,
        countrey,
        img,
        awards,
        public distillery: string,
        public style: string,
        public age: number) {
        super(abv, countrey, img, awards)
        Whiskey.stock++
    }
    getName() {
        return `${this.distillery}, ${this.countrey}`
    }
    getSummary() {
        return `was distilled by ${this.distillery} from ${this.countrey}`
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">style: ${this.style}</li>
        <li class="list-group-item">age: ${this.age}</li>
        `
    }
}

class Wine extends Beverages {
    static stock = 0
    constructor(
        abv,
        countrey,
        img,
        awards,
        public winery: string,
        public grapes: string,
        public vintage: number) {
        super(abv, countrey, img, awards)
        Wine.stock++
    }
    getName() {
        return `${this.winery}, ${this.countrey}`
    }
    getSummary() {
        return `was aged at ${this.winery} caves in ${this.countrey}`
    }
    getList() {
        return `
        <li class="list-group-item">abv: ${this.abv}</li>
        <li class="list-group-item">grapes: ${this.grapes}</li>
        <li class="list-group-item">vintage: ${this.vintage}</li>
        `
    }
}

// Local Vars
let isModalOpen = false

let stock: Beverages[] = [
    new Beer(4.3, "israel", "https://i2.wp.com/super-arlozorov.co.il/wp-content/uploads/2019/03/jems-ipa.jpg?fit=1176%2C1248&ssl=1", undefined, "Jem's", "IPA", 57),
    new Beer(5.7, "israel", "https://upload.wikimedia.org/wikipedia/he/thumb/e/e0/Alexander_Beer_Green.jpg/450px-Alexander_Beer_Green.jpg", undefined, "Alexander", "green", 37),
    new Whiskey(46, "Scotland", "https://d256619kyxncpv.cloudfront.net/gui/img/2014/12/05/14/2014120514_ardbeg_10_year_old_original.png", undefined, "Ardbeg", "smokey islay", 10),
    new Whiskey(50, "Scotland", "https://images-na.ssl-images-amazon.com/images/I/818v89ra%2BAL._AC_SL1500_.jpg", undefined, "lafroigh", "smokey islay", 10),
    new Wine(13.2, "Israel", "https://273628-849438-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/11/virtuoso.jpg", undefined, "Hayotzer", "Virtuoso", 2013)
]

// DOM Traversing
let labelArr = document.querySelectorAll("label")
let addbtn = document.querySelector(".floatbtn")
let addRadioArr = document.querySelectorAll('input[name="optionsadd"]')
let fst = document.querySelector("#fst")
let snd = document.querySelector("#snd")
let trd = document.querySelector("#trd")
let abv = document.querySelector("#abv")
let countery = document.querySelector("#countery")
let img = document.querySelector("#img")

// Event Handlers
function handleFilter(e: Event) {
    labelArr.forEach(l => {
        if (l != e.currentTarget && l.className.includes("active")) {
            l.classList.remove("active")
        }
    });
    (e.currentTarget as HTMLElement).classList.add("active")
    // filter the view draw
    switch ((e.target as HTMLElement).id) {
        case "allinp":
            draw(stock)
            break;
        case "beerinp":
            draw(stock.filter(b => b instanceof Beer))
            break;
        case "whiskeyinp":
            draw(stock.filter(b => b instanceof Whiskey))
            break;
        case "wineinp":
            draw(stock.filter(b => b instanceof Wine))
            break;
        default:
            break;
    }


}


let draw = (arr: Beverages[]) => {
    let listElm = document.querySelector(".list")
    let [allbdg, beerbdg, whiskeybdg, winebdg] = document.querySelectorAll(".badge");
    (allbdg as HTMLElement).textContent = Beverages.stock.toString();
    (beerbdg as HTMLElement).textContent = Beer.stock.toString();
    (whiskeybdg as HTMLElement).textContent = Whiskey.stock.toString();
    (winebdg as HTMLElement).textContent = Wine.stock.toString();
    // zero items
    if (arr.length == 0) {
        listElm.innerHTML = `<h1 class="display-4">there's nothing here 😣</h1>`
    } else {

        listElm.innerHTML = ''
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
        `
        }
    }
}

let modal = () => {
    console.log("here")
    let mod: HTMLElement = document.querySelector(".modal")
    if (isModalOpen) { // if open ==> close
        mod.style.display = "none"
        console.log("closed")
        addbtn.textContent = "+"

    } else { // if closed ==> open
        mod.style.display = "block"
        console.log("opened")
        addbtn.textContent = "x"

    }
    // for the next click
    isModalOpen = !isModalOpen
    console.log("new state:", isModalOpen)
}




document.querySelector("#add-form").addEventListener("submit", e => {
    (e.target as HTMLFormElement).reset()
    e.preventDefault() //don't refresh
    modal() // close modal
    switch (document.querySelector('input[name="optionsadd"]:checked').id) {
        case "beeraddinp":
            stock.push(new Beer(
                (abv as HTMLInputElement).valueAsNumber,
                (countery as HTMLInputElement).value,
                (img as HTMLInputElement).value,
                undefined,
                (fst as HTMLInputElement).value,
                (snd as HTMLInputElement).value,
                (trd as HTMLInputElement).valueAsNumber))
            break;
        case "whiskeyaddinp":
            stock.push(new Whiskey(
                (abv as HTMLInputElement).valueAsNumber,
                (countery as HTMLInputElement).value,
                (img as HTMLInputElement).value,
                undefined,
                (fst as HTMLInputElement).value,
                (snd as HTMLInputElement).value,
                (trd as HTMLInputElement).valueAsNumber))
            break;
        case "wineaddinp":
            stock.push(new Wine(
                (abv as HTMLInputElement).valueAsNumber,
                (countery as HTMLInputElement).value,
                (img as HTMLInputElement).value,
                undefined,
                (fst as HTMLInputElement).value,
                (snd as HTMLInputElement).value,
                (trd as HTMLInputElement).valueAsNumber))
            break;

        default:
            break;
    }
    draw(stock)
})

addbtn.addEventListener("click", modal)



labelArr.forEach(label => {
    label.addEventListener("click", handleFilter)
})

addRadioArr.forEach(radio => {
    radio.addEventListener("change", e => {
        console.log((e.target as HTMLElement).id)
        switch ((e.target as HTMLElement).id) {
            case "beeraddinp":
                fst.parentNode.childNodes[1].textContent = "brewery"
                snd.parentNode.childNodes[1].textContent = "style"
                trd.parentNode.childNodes[1].textContent = "ibu"
                break;
            case "whiskeyaddinp":
                fst.parentNode.childNodes[1].textContent = "distillery"
                snd.parentNode.childNodes[1].textContent = "style"
                trd.parentNode.childNodes[1].textContent = "age"
                break;
            case "wineaddinp":
                fst.parentNode.childNodes[1].textContent = "winery"
                snd.parentNode.childNodes[1].textContent = "grapes"
                trd.parentNode.childNodes[1].textContent = "vintage"
                break;

            default:
                break;
        }
    })
})


// Main
draw(stock)
