
var bt_searsh = document.getElementById("bt_searsh");
var bt_next = document.getElementById("bt_next");
var bt_prev = document.getElementById("bt_prev");
var inputS = document.getElementById("inp_searsh");
var countries = document.getElementById("countries");


var data = document.getElementById("data");
var loader = document.getElementById("loader");


var apiStr = "https://api.manatal.com/open/v3/career-page/diaaland/jobs/"
var api_id = null;

var api_next = null;
var api_prev = null;
var pageSize = null;
var pageSize_f = null;

var api_desc = null;

var div = document.getElementById('custom')

var data = [];

bt_prev.setAttribute('disabled', true);


/*-- load_data from api  --*/

function api() {
    var xhr_all_job = new XMLHttpRequest();
    xhr_all_job.open('GET', apiStr)



    xhr_all_job.onload = function () {
        // if(xhr_all_job.readyState ===4 && xhr_all_job.status ===200){
        //     console.log("clear")
        // }
        data = JSON.parse(this.responseText)
        console.log(data)
        // console.log(data);
        for (var item of data.results) {

            div.innerHTML += `
            <div class="card-1 col-lg-5 text-center w-lg-50 px-3 py-3">
                <div class="info bg-white h-100 px-4 py-3 rounded shadow" >
                    <div class="media-body" >
                        <a href="${item.id}" class="text-primary" data-toggle="modal"
                        data-target="#exampleModal" id="bt_info1" >
                            <h5 class="fs-5  mt-0 mb-1">
                                ${item.position_name}</h5>
                        </a>
                        <span class="text-secondary"><i class="bi bi-pin-map px-1"></i><span style="margin-right: 10px;">
                            ${item.location_display} </span> <br></span>
                    </div>
                </div>
            </div>`

        }
        api_next = data.next;
        api_prev = data.previous;
        pageSize = data.count;

        load_job_info();

        if (api_next == null) {
            bt_next.setAttribute('disabled', true);
        }
        if (api_prev != null) {
            bt_prev.removeAttribute('disabled');
        }

    }
    xhr_all_job.send()


    /*--fill drop down Contries --  */

    var xhr_all_country = new XMLHttpRequest();

    xhr_all_country.open('GET', `https://api.manatal.com/open/v3/career-page/diaaland/jobs/?page_size=61`)

    xhr_all_country.onload = function () {
        data = JSON.parse(this.responseText)

        var dt = data.results.filter((obj, pos, arr) => {
            return arr
                .map(mapObj => mapObj.country)
                .indexOf(obj.country) == pos;
        });


        for (var item of dt) {

            countries.innerHTML += `<option value="${item.country}" class="dropdown-item">${item.country}</option>`

        }



    }
    xhr_all_country.send()



}


/*-- event click button next Page  --*/

bt_next.addEventListener("click", () => {
    div.innerHTML = "";
    var xhr_next_page = new XMLHttpRequest();

    xhr_next_page.open('GET', api_next)

    xhr_next_page.onload = function () {
        data = JSON.parse(this.responseText)
        console.log(data)
        // console.log(data);
        for (var item of data.results) {

            div.innerHTML += `
            <div class="card-1 col-lg-5 text-center w-lg-50 px-3 py-3">
            <div class="info bg-white h-100 px-4 py-3 rounded shadow">
                <div class="media-body">
                    <a href="${item.id}" class="text-primary" data-toggle="modal"
                        data-target="#exampleModal" id="bt_info1" >
                            <h5 class="fs-5  mt-0 mb-1">
                                ${item.position_name}</h5>
                        </a>
                    <span class="text-secondary"><i class="bi bi-pin-map px-1"></i><span style="margin-right: 10px;">
                        ${item.location_display} </span> <br></span>
                </div>
            </div>
            </div>`

        }
        api_next = data.next;
        api_prev = data.previous;

        load_job_info();

        if (api_next == null) {
            bt_next.setAttribute('disabled', true);
        }
        if (api_prev != null) {
            bt_prev.removeAttribute('disabled');
        }

        console.log(api_next)

    }
    xhr_next_page.send()


});

/*-- event click button Previous page--;  --*/

bt_prev.addEventListener("click", () => {
    div.innerHTML = "";
    var xhr_prev_page = new XMLHttpRequest();

    xhr_prev_page.open('GET', api_prev)

    xhr_prev_page.onload = function () {
        data = JSON.parse(this.responseText)
        console.log(data)
        // console.log(data);
        for (var item of data.results) {

            div.innerHTML += `
            <div class="card-1 col-lg-5 text-center w-lg-50 px-3 py-3">
            <div class="info bg-white h-100 px-4 py-3 rounded shadow">
                <div class="media-body">
                    <a href="${item.id}" class="text-primary" data-toggle="modal"
                        data-target="#exampleModal" id="bt_info1" >
                            <h5 class="fs-5  mt-0 mb-1">
                                ${item.position_name}</h5>
                        </a>
                    <span class="text-secondary"><i class="bi bi-pin-map px-1"></i><span style="margin-right: 10px;">
                        ${item.location_display} </span> <br></span>
                </div>
            </div>
            </div>`

        }
        api_next = data.next;
        api_prev = data.previous;

        load_job_info();

        if (api_prev == null) {
            bt_prev.setAttribute('disabled', true);
        }
        bt_next.removeAttribute('disabled');

        console.log(api_prev)
    }
    xhr_prev_page.send()
});



/*-- search buttons --*/

bt_searsh.addEventListener('click', function () {
    div.innerHTML = "";

    var searsh_item = inputS.value.toString();
    const searsh_itemC = searsh_item.charAt(0).toUpperCase() + searsh_item.slice(1);
    const searsh_country = countries.value;


    if (searsh_item != "" || searsh_country != "") {

        var xhr_searsh_job = new XMLHttpRequest();
        

        xhr_searsh_job.open('GET', `https://api.manatal.com/open/v3/career-page/diaaland/jobs/?page_size=${pageSize}&page=1&search=${searsh_itemC}&country__icontains=${searsh_country}`)

        xhr_searsh_job.onload = function () {


            if (xhr_searsh_job.readyState === 4 && xhr_searsh_job.status === 200) {
                // console.log("clear")
            }
            data = JSON.parse(this.responseText)

            for (var item of data.results) {
                let a = [];

                a.push(item.position_name);


                div.innerHTML += `
            <div class="card-1 col-lg-5 text-center w-lg-50 px-3 py-3">
            <div class="info bg-white h-100 px-4 py-3 rounded shadow">
                <div class="media-body" >
                <a href="${item.id}" class="text-primary" data-toggle="modal"
                data-target="#exampleModal" id="bt_info1" >
                    <h5 class="fs-5  mt-0 mb-1">
                        ${item.position_name}</h5>
                </a>
                    <span class="text-secondary"><i class="bi bi-pin-map px-1"></i><span style="margin-right: 10px;">
                        ${item.location_display} </span> <br></span>
                </div>
            </div>
            </div>`

            }

            api_next = data.next;
            api_prev = data.previous;
            console.log(data.count)

            load_job_info();

            if (api_next == null) {
                bt_next.setAttribute('disabled', true);
            }
            if (api_prev != null) {
                bt_prev.removeAttribute('disabled');
            }
        }
        xhr_searsh_job.send()
        
    }
    else {
        countries.innerHTML = `<option value="" >--select country--</option>`;
        api();

    }



})

window.onload = api();


function load_job_info() {
    var links = div.getElementsByTagName('a')


    for (i = 0; i < links.length; i++) {
        links[i].onclick = function (e) {

            var bd = document.getElementById("md_bd");
            var mt = document.getElementById("exampleModalLabel");
            
            

            var id = e.currentTarget.getAttribute('href')
            // console.log(id)

            api_id = `${apiStr}${id}`

            var xhr1 = new XMLHttpRequest();

            xhr1.open('GET', api_id)
            

            xhr1.onload = function () {

                data = JSON.parse(this.responseText)

                mt.innerText += `${data.position_name}`

                bd.innerHTML += `${data.description}`

                apply_job();

            }
            xhr1.send()

            mt.innerText = ""

            bd.innerHTML = ""

        }
    }
}

function apply_job(){
    var bt_aply = document.getElementById("btn_aply");
    bt_aply.addEventListener('click',function(){
        bt_aply.setAttribute('href',`https://www.careers-page.com/diaaland/job/${data.hash}/apply`)
    })
}
