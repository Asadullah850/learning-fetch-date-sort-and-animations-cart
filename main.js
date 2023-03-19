let setDate = []
// console.log(setDate)

const fetchLoadData =async (dataLimit) =>{
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await res.json()
        setDate =data.data;
    showData(data.data.tools,dataLimit);
}

// show data See-More
const showData = (data,dataLimit) =>{
//   set data limit
        const showAll = document.getElementById('See-More');
        if (dataLimit && data.length > 8) {
            data = data.slice(0,6);    
        }
        else{
            showAll.classList.add('hidden')
        }

    data.forEach(element => {
        let serial = 0;

        //  element.published_in = setDate
        const {id,features,name,image,published_in} = element
        let getDate = new Date(published_in)
        // asnging to date
        let agetDate = new Date(published_in).getFullYear()
        let bgetDate = new Date(published_in).getFullYear()

    //     var sumAndMultiply = function(sum, multiply) {
    //         for (let x = 0; x <= published_in.length; x++) {
    //        for (let y = 0; y <= 1000; y++) {
    //          if (x + y === sum && x * y === multiply) {
    //            return [x, y].sort((a, b) => a - b);
    //          }
    //        }
    //      }
    //    }
       
        document.getElementById('card-body').innerHTML +=`
        <!-- card  -->
            <div data-aos="flip-up" class="card border-2 border-gray-100 shadow-xl">
                <figure class="px-5 pt-5">
                  <img src="${image}" class="rounded-xl" />
                </figure>
                <div class="card-body p-5">
                  <div class="">
                    <h2 class="text-3xl font-semibold">Features</h2>
                    ${features ?  features.map((a) => {
                        return `<p class="my-1">${++serial}. ${a}</p>`
                        
                    }).join("")
                    : 
                    `<p class="my-1">'No Data Founde'</p>`
                }
                   
                  </div>
                  <div class="h-[2px] bg-gray-300"></div>
                  <div class="footer">
                    <div class="text">
                        <h2 class="text-2xl font-semibold my-2">${name}</h2>
                        <div class="flex">
                            <img src="calendar_date_event_month_icon.png" class="h-4 w-4" />
                            <p class="px-2">${getDate.toDateString()}</p>
                        <div/>
                    </div>
                    <div class="card-actions ">
                    <!-- The button to open modal -->
                        <label onclick="fetchCardDetails('${id}')" for="my-modal-5" class="absolute bottom-4 right-6">
                            <img class="w-8 h-8 hover:bg-blue-200 rounded-md" src="small_right_arrow_icon.png" alt="" srcset="">
                        </label>
                    </div>
                  </div>    
                </div>
              </div>
            <!-- card  -->
        `; 
        spinner(false)
    });
    
}


// add see more button
document.getElementById('See-More').addEventListener('click',function(){
    document.getElementById('card-body').innerHTML = '';
    fetchLoadData()
})

let singleIdData = []
// fetch modalData / single card data 
const fetchCardDetails =async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(setCardDetails)
    showModalData(data.data);
}

// set modalData / single card data
const showModalData = (fetchElement) =>{

    // console.log(fetchElement);
    const {description,pricing,features,integrations,input_output_examples,accuracy,image_link} = fetchElement;

    // last working
    // console.log(integrations);
//    integrations.map(data =>  console.log(data))
    
    // last working
    
    // set data in variable singleData
    singleIdData = fetchElement

    // console.log(integrations);
    document.getElementById('modal-element').innerHTML ='';
    document.getElementById('modal-element').innerHTML +=`
    <!--// model show data start -->
    
    <div class="flex md:flex-row lg:flex-row flex-col-reverse my-10 ">
                        <div class="border-2 border-gray-200 rounded-md p-2">
                            <h1 class="text-lg font-semibold text-center my-4">${description}</h1>
                            <div id="priceDiv" class="grid grid-cols-3 gap-4 my-3 mx-5">
                            <!-- plan 1-->
                                <div class="border-2 border-gray-200 rounded-md px-1 py-4 bg-white text-center">
                                    <p class="text-[#03A30A] font-semibold" >${!pricing  ? 'Free of Cost'  : pricing[0].price} <br/>${!pricing ? 'Basic' :  pricing[0].plan }</p>
                                </div> 
                            <!-- plan 2-->
                                <div class="border-2 border-gray-200 rounded-md px-1 py-4 bg-white text-center">
                                    <p class="text-[#F28927] font-semibold" >${!pricing  ? 'Free of Cost'  : pricing[1].price} <br/>${!pricing ? 'Basic' :  pricing[1].plan }</p>
                                </div> 
                            <!-- plan 3-->
                                <div class="border-2 border-gray-200 rounded-md px-1 py-4 bg-white text-center">
                                    <p class="text-[#e64949] font-semibold">${!pricing  ? 'Free of Cost'  : pricing[2].price} <br/>${!pricing ? 'Basic' :  pricing[2].plan }</p>
                                </div> 
                                                  
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="p-2">
                                    <h1 class="text-xl my-2 font-semibold">Features</h1>
                                    <li class="my-2">${!features ? 'No data Found' : features[1].feature_name}</li>
                                    <li class="my-2">${!features ? 'No data Found' : features[2].feature_name}</li>
                                    <li class="my-2">${!features ? '' : features[3].feature_name}</li>
                                </div>
                                <div class="p-2">
                                    <h1 class="text-xl my-2 font-semibold">Integrations</h1>
                                    ${integrations ? integrations.map((a)=>{
                                        console.log(a);
                                        return `<li class="my-2">${a}</li>`
                                    }).join('') :
                                    "No data Found"}
                                    

                                </div>           
                            </div>
                        </div>
        
                        <div class="border-2 border-gray-200 rounded-md ml-2 p-2">
                            <div class="">
                                <img class="w-[95%] mx-auto md:min-w-full lg:min-w-full max-w-sm rounded-md" src="${image_link[0] ? image_link[0]  :  image_link[1]}" alt="" srcset="">
                                <p class="absolute top-24 right-14 text-white bg-[#EB5757] p-2 rounded-md">${parseFloat(accuracy.score) * 100 ? parseFloat(accuracy.score) * 100 + '% accuracy' : '' }</p>
                            </div>
                            <h1 class="text-lg font-semibold text-center my-2">${!input_output_examples ? 'Can you give any example?' :  input_output_examples[0].input }</h1>
                            <p class=" text-center my-3">${!input_output_examples ? 'No! Not Yet! Take a break!!!' : input_output_examples[0].output }</p>
                        </div>
                    </div>
                    <div class="modal-action">
                        <label for="my-modal-5" class="btn text-3xl">X</label>
                    </div>
    <!-- // model show data end -->
    `;
    // model end 
};


// spinner add function
const spinner = isLoding =>{
    let spinnerDiv = document.getElementById('spinner-div');
    if (isLoding) {
        spinnerDiv.classList.remove('hidden')
    }else{
        spinnerDiv.classList.add('hidden')
    }
}
// sorting data by yearly
document.getElementById('sort').addEventListener('click',function(){
    const getArray = setDate.tools
    getArray.sort((a,b)=>{
        // console.log(a.published_in);
        // console.log(b.published_in);
        return (a.published_in) <(b.published_in)  ? 1: -1
    })
    console.log(getArray);
          
// button hidden
document.getElementById('See-More').classList.add('hidden');
document.getElementById('sort-button').classList.add('hidden');
// make card
document.getElementById('card-body').innerHTML = '';
// fetchLoadData()
showData(getArray)

})

fetchLoadData(6)

// document.getElementById('sort-by-price-btn').addEventListener('click', () =>{
//     allRooms.sort((a,b)=>{
//        return parseFloat(a.price) < parseFloat(b.price)  ? 1: -1
//    })
//    // console.log(allRooms)
//    displayRoomsData(allRooms)
// })