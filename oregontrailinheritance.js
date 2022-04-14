//Atividade começa na linha 129

class Traveler {
    constructor(name){
        
        this._name = name
        this._food = 1
        this._isHealthy = true        
    }

    //pegando os valores com get

    get name(){
        return this._name
    }

    get food(){
        return this._food
    }

    get isHealthy(){
        return this._isHealthy
    }

    //atribuindo valores com set

    set name(novoNome){
        return this._name = novoNome
    }

    set food(quantidadeComida){
        return this._food = quantidadeComida
    }

    set isHealthy(quantidadeVida){
        return this._isHealthy = quantidadeVida
    }


    hunt(){

        this._food += 2   
    }

    eat(){

        if(this._food > 0){
            this._food--
        } else {
            this._isHealthy = false
        }
    }
}



class Wagon {
    
    constructor(capacity){
        

        this._capacity = capacity
        this._passengers = []  
    }

    //recebendo dados com get

    get capacity(){
        return this._capacity
    }

    get passengers(){
        return this._passengers
    }

    //atribuindo dados com set

    set capacity(novaCapacidade){
        return this._capacity = novaCapacidade
    }

    set passengers(novoPassageiro){
        return this._passengers = novoPassageiro
    }

    getAvailableSeatCount(){

        let contadorAcentos = this._capacity

        if(this._passengers[0] == undefined){
            return contadorAcentos
        }

        return contadorAcentos - this._passengers.length             
    }     
          

    join(viajante){

        if(this.getAvailableSeatCount() > 0){
            
            this._passengers.push(viajante)        
        }
    }    

    shouldQuarantine(){

        //retornando 

    //       obj Traveler    algum  passageiro verfica    passageiro boleano ao contrario 
        return this._passengers.some((passenger) => !passenger._isHealthy)  
    
    }    

    totalFood(){

        let contadorComida = 0

        this._passengers.forEach((passenger) => {

            contadorComida += passenger.food         
            
            })

            return contadorComida      

        }
    }

////////////////////////////////////////atividade começa aqui///////////////////////////////////////////

class Hunter extends Traveler{
    constructor(name){
        super(name)

        this.name = name
        this.food = 2
        this.isHealthy = true 
    }

    hunt(){
        this.food += 5
    }

    eat(){
        
        if(this.food >= 2){
            this.food -= 2

        } else {
            
            this.food = 0
            this.isHealthy = false
        }
        
        
            
    }

    giveFood(traveler, numOfFoodUnits){

        //verifica hunter tem a quantidade para transferir ao viajante

        if(this.food >= numOfFoodUnits){

            //se positivo, retira do hunter

            this.food -= numOfFoodUnits

            //e passa para o viajante

            traveler._food += numOfFoodUnits

        }

        //caso contrário, nada acontece feijoada        
    }
}


class Doctor extends Traveler{
    constructor(name){
        super(name)        
    }

    //cura os viajantes
    heal(traveler){
        
        //verifica se o isHealthy do viajante é false

        if(traveler._isHealthy == false){    
            
            //se for, troca para true
            traveler._isHealthy = true
        }
    }
}




// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter); 

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);