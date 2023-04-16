document.addEventListener("DOMContentLoaded", function(e) {
    getAllProjects(listOfProjects);
});

document.querySelector("#filter").addEventListener("change", function(e){
    var optionSelected = e.target.value;

    document.querySelectorAll('#projetosList .card').forEach(function(elem){
        elem.parentElement.classList.remove('d-none');

        if(!elem.dataset.opcoes.split(',').includes(optionSelected) && optionSelected != ''){
            elem.parentElement.classList.add('d-none');
        }
    });
});

function redirect(url){
    window.open(url, '_blank').focus();
}

async function getAllProjects(listOfProjects) {
    listOfProjects.forEach(project => {
        fetch('https://api.github.com/repos/caca404/'+project.nomeRepo+'/commits/main')
        .then(value => value.json())
        .then((value) => {
            var dateCommit = moment(value.commit.author.date).format('[Ultimo commit foi no dia] DD/MM/YYYY [ás] HH:mm:ss');
            var options = {
                method: 'GET',
                headers: new Headers()
            }

            fetch('src/components/cardProject.html', options)
            .then(value => value.text())
            .then((value) => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(value, 'text/html');
                console.log(doc);
            });
        });
    });
}