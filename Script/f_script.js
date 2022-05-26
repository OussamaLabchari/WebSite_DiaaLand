var title = document.getElementById('title_job');
var H_title = document.getElementById('h_title');


//inputs

var f_name = document.getElementById('field_us_10301').value
var email_ = document.getElementById('field_Em_10302').value
var phone_number = document.getElementById('field_Ph_10303').value
var cover_letter = document.getElementById('field_Cl_10304').value
var upload = document.getElementById('field_U_10310')
var year_exp = document.getElementById('field_Ae_10312').value
var compt_linkdn = document.getElementById('field_Clink_10314').value
var compt_github = document.getElementById('field_Gh_10313').value


const param = (new URL(document.location)).searchParams;
var id = param.get('id');

var apiStr = `https://api.manatal.com/open/v3/career-page/diaaland/jobs/${id}`

var xhr1 = new XMLHttpRequest();

xhr1.open('GET', apiStr)

xhr1.onload = function () {

    data = JSON.parse(this.responseText)
    title.innerText = data.position_name;
    H_title.innerText = data.position_name;


}
xhr1.send()

function from_ver() {
    v_upload();
    const forms = document.querySelectorAll('.requires-validation')
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                }

                form.classList.add('was-validated')
            }, false)
        })

}

function v_upload() {

    var lbl = document.getElementById('lbl_file')
    var err = document.querySelector('.file')


    // let file_Typ = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]
    upload.addEventListener('change', function () {
        err.style.display = "none"
        if (this.files[0].size <= 5000000) {

            lbl.innerText = this.files[0].name
            err.style.display = "none"
            console.log(upload.value)
        }
        else {
            this.value = '';
            err.style.display = "block"
            err.innerText = "Ce fichier n'est pas valide. Les formats pris en charge incluent PDF, DOC, DOCX ou RTF (max 5MB)."
        }



    })
}


window.onload = from_ver();
