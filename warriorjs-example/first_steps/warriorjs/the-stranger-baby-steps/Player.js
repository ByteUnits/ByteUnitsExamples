// Direction Constants
const Directions = {
    forward: 'forward',
    backward: 'backward'
};

class Player {
    constructor(){
        this.health = 20;
        this.currentDirection = Directions.backward;
    }

    playTurn(warrior) {
        // Current state
        var isTakingDamage = warrior.health() < this.health;
        var isFacingWall = warrior.feel(this.currentDirection).isWall();
        var isCaptiveInRange = this.isEnemyInSight(warrior.look(this.currentDirection));
        
        // Main Actions
        if(isFacingWall){ // if facing wall reverse
            warrior.pivot();
        } else if(isTakingDamage && (warrior.health() < (warrior.maxHealth() * 0.5))) { // run away
            warrior.walk(Directions.backward);
        } else if(warrior.feel(this.currentDirection).getUnit() !== undefined 
            && warrior.feel(this.currentDirection).getUnit().isBound()){ // free captive
            warrior.rescue(this.currentDirection);
        } else if(isCaptiveInRange) {
            warrior.shoot(this.currentDirection);  
        } else if(!warrior.feel(this.currentDirection).isEmpty()){ // fight
            warrior.attack(this.currentDirection);
        }  else if(!isTakingDamage && warrior.health() < warrior.maxHealth()){ // heal
            warrior.rest();
        } else { // default to walking
            warrior.walk(this.currentDirection);
        }

        this.health = warrior.health();
    }

    isEnemyInSight(lookArray) {
        const spaceWithUnit = lookArray.find(space => space.isUnit());
        return spaceWithUnit && spaceWithUnit.getUnit().isEnemy();
    }
}
