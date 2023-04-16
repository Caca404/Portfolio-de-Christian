<script setup>
    import '../assets/css/bootstrap.min.css';
    import headCardProject from './headCardProject.vue';
    import axios  from 'axios';
    import moment from 'moment/moment';
</script>
<template>
    <div class="col-12 col-md-3 mb-4 mb-md-3 d-flex align-items-stretch">
        <div class="card bg-card-dark" :data-opcoes="dataOpcoes">
            <div class="card-header text-center p-0 d-flex justify-content-center">
                <headCardProject :projectLanguages="languages" />
            </div>
            <div class="card-body text-justify">
                <h4 class="projectName">{{ nome }}</h4>
                <p class="projectDetails">{{ details }}</p>
            </div>
            <div class="card-footer">
                <i class="lastChange" :data-date="lastCommitCode">{{ lastCommit }}</i>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'CardProject',
        components:{
            headCardProject
        },
        props: {
            dataOpcoes: String,
            nome: String,
            details: String,
            nomeRepo: String|Array,
            languages: Array
        },
        emits: ['updateCount'],
        data(){
            return{
                lastCommit: "",
                lastCommitCode: "",
                commitComparation: []
            }
        },  
        async mounted(){
            if(typeof this.nomeRepo == "object"){
                this.nomeRepo.forEach(async (element, index) => {
                    
                    await axios.get('https://api.github.com/repos/'+element+'/commits/main')
                    .then(resp => {
                        this.commitComparation.push(resp.data.commit.author.date);
                    });

                    if(this.nomeRepo.length == index+1){
                        var m = moment(this.commitComparation[0]);
                        
                        if(m.isAfter(this.commitComparation[1])){
                            this.lastCommit = m.format('[Ultimo commit foi no dia] DD/MM/YYYY [ás] HH:mm:ss');
                            this.lastCommitCode = this.commitComparation[0]; 
                        }
                        else{
                            this.lastCommit = moment(this.commitComparation[1]).format('[Ultimo commit foi no dia] DD/MM/YYYY [ás] HH:mm:ss');
                            this.lastCommitCode = this.commitComparation[1]; 
                        }
                    }
                });
            }
            else{
                await axios.get('https://api.github.com/repos/caca404/'+this.nomeRepo)
                .then(resp => {
                    this.lastCommit = (moment(resp.data.commit.author.date).format('[Ultimo commit foi no dia] DD/MM/YYYY [ás] HH:mm:ss'));
                    this.lastCommitCode = resp.data.commit.author.date;
                });
            }
        },
        updated(){
            this.$emit('updateCount');
        }
    }
</script>