const keys = {
    d: {pressed: false,},
    a: {pressed: false,},

}

window.addEventListener('keydown', (event) => {
    console.log(event);
    switch (event.key){
        case "D":
        case "d": 
        keys.d.pressed = true
        break
        
        case "A": 
        case "a": 
        keys.a.pressed = true
        break

        case "W": 
        case "w": 
            pers.pular();
        break
    }
})


window.addEventListener('keyup', (event) => {
    switch (event.key){
        case "D":
        case "d": 
        keys.d.pressed = false
        break
        
        case "A":
        case "a": 
        keys.a.pressed = false
        break   


    }
})


