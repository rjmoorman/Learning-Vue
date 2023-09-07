function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min))+ min
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLogs: []
        }
    },
    watch: {
        playerHealth(value) {

            if (value <= 0 && this.monsterHealth <=0) {
                this.winner = 'draw'
            }
            else if( value<=0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {

            if (value <= 0 && this.playerHealth <=0) {
                this.winner = 'draw'
            }
            else if( value<=0){
                this.winner = 'player'
            }
        }
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth <0){
                return {width: '0%'}
            }
            return { width: this.monsterHealth +'%'};
        },
        playerBarStyles() {
            if(this.playerHealth <0){
                return {width: '0%'}
            }
            return { width: this.playerHealth +'%'}
        },
        isThirdRound() {
            return this.currentRound % 3 !== 0
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++
            console.log('Monster Attacked')
            const attackValue = getRandomValue(12, 5); 
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.logAttack('player', 'attack', attackValue);
        },
        attackPlayer() {
            const attackValue = getRandomValue(15, 8);
            this.playerHealth -= attackValue;
            this.logAttack('monster', 'attack', attackValue);

        },
        specialAttack() {
            this.currentRound++
            const attackValue = getRandomValue(20,11);
            this.monsterHealth -= attackValue;
            this.attackPlayer()
            this.logAttack('special', 'attack', attackValue);

        },
        healPlayer() {
            this.currentRound++
            this.attackPlayer()
            const healValue = getRandomValue(15,8)
            this.logAttack('player', 'heal', healValue);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
            this.playerHealth += healValue
            }
            
        },
        resetHealth() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null
            this.currentRound = 0,
            this.battleLogs = []
        },
        surrender(){
            this.winner = 'monster'
        },
        logAttack(who, what, value) {
            this.battleLogs.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});

app.mount('#game')