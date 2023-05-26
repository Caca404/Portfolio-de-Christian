<script setup>
    import {listOfProjects} from '../assets/js/listOfProjects.js';
    import cardProject from './cardProject.vue';
    import moment from 'moment/moment';

</script>


<template>
    <section id="projetos" class="p-4">
		<div class="container">
			<h2 class="text-white">Projetos</h2>
			<div class="col-12 col-md-5">
				<select id="filter" class="form-select bg-dark text-white" @change="filterChange($event)">
					<option value="" selected>Selecione uma Linguagem/Framework</option>
					<option value="php">PHP</option>
					<option value="javascript">Javascript</option>
					<option value="typescript">Typescript</option>
					<option value="laravel">Laravel</option>
					<option value="api">API</option>
					<option value="asp">ASP</option>
					<option value="react">React</option>
					<option value="vue">Vue</option>
					<option value="angular">Angular</option>
				</select>
			</div>
		</div>
		<div class="container mt-4">
			<div class="row mb-3" id="projetosList">
                <cardProject v-for="project in listOfProjects" :key="project.key" 
                    :nome="project.titulo" :details="project.details" :nomeRepo="project.nomeRepo"
                    :dataOpcoes="project.opcoes" :languages="project.languages" @updateCount="updateCount"/>
				
			</div>
		</div>
	</section>
</template>

<script>
    export default {
        name: 'Projetos',
        components: {
            cardProject
        },
        data(){
            return{
                countAsync: 0
            }
        },
        methods:{
            filterChange(e){
                var optionSelected = e.target.value;

                document.querySelectorAll('#projetosList .card').forEach(function(elem){
                    elem.parentElement.classList.remove('d-none');

                    if(!elem.dataset.opcoes.split(',').includes(optionSelected) && optionSelected != ''){
                        elem.parentElement.classList.add('d-none');
                    }
                });
            },
            sortCards(){
                var cards = document.querySelector("#projetosList");
                const children = [...cards.children];
                

                children.sort((a, b) => {
                    return moment(a.querySelector("i[data-date]").dataset.date).isAfter(b.querySelector("i[data-date]").dataset.date) ? -1 : 1;
                });

                cards.innerHTML = "";
                children.forEach(item => cards.appendChild(item));
            },
            updateCount(){
                this.countAsync++;
                if(listOfProjects.length == this.countAsync) this.sortCards();
            }
        }
    }
</script>